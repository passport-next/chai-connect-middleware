/* eslint-disable no-shadow -- Convenient */
/** @import {ConnectResponse, ResponseHeaderValue} from '@passport-next/http-types' */

/**
 * @typedef {() => void} ResponseCallback
 */

/**
 * Creates an instance of `Response`.
 *
 * This class is used as a mock when testing Connect middleware, substituted in
 * place of of a Node's `http.ServerResponse`.
 *
 * @class
 * @protected
 * @implements {ConnectResponse}
 */
class Response {
  /** @type {ResponseCallback | undefined} */
  #cb;
  /** @type {Record<string, ResponseHeaderValue>} */
  #headers = {};
  #data = '';

  /** @type {string | undefined} */
  body;
  statusCode = 200;

  /**
   * @param {ResponseCallback} [cb]
   */
  constructor(cb) {
    this.#cb = cb;
  }

  /**
   * @param {string} name
   * @returns {ResponseHeaderValue | undefined}
   */
  getHeader(name) {
    return this.#headers[name];
  }

  /**
   * @param {string} name
   * @param {ResponseHeaderValue} value
   * @returns {void}
   */
  setHeader(name, value) {
    this.#headers[name] = value;
  }

  /**
   * @param {unknown} [data]
   * @returns {void}
   */
  end(data /* , encoding */) {
    if (data) {
      this.#data += /** @type {string} */ (data);
    }
    if (this.#data.length) {
      this.body = this.#data;
    }
    if (this.#cb) {
      this.#cb();
    }
  }
}

/**
 * Expose `Response`.
 */
export default Response;
