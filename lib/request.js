/* eslint-disable no-shadow -- Convenient */
/** @import {ConnectRequest} from '@passport-next/http-types' */

/**
 * Creates an instance of `Request`.
 *
 * This class is used as a mock when testing Connect middleware, substituted in
 * place of of a Node's `http.IncomingMessage`.
 *
 * @class
 * @protected
 * @implements {ConnectRequest}
 */
class Request {
  method = 'GET';
  url = '/';
  /** @type {Record<string, import('@passport-next/http-types').HeaderValue>} */
  headers = {};
}

/**
 * Expose `Request`.
 */
export default Request;
