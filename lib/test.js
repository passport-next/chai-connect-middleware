/* eslint-disable no-shadow -- Convenient */
/**
 * Module dependencies.
 */
import Request from './request.js';
import Response from './response.js';
import * as exres from './express/response.js';

/**
 * @typedef {import('./request.js').default &
 *   import('../request-extensions.js').RequestExtensions} ChaiConnectRequest
 */

/**
 * @typedef {import('@passport-next/http-types').Middleware<
 *   ChaiConnectRequest,
 *   import('./response.js').default
 * >} ChaiConnectMiddlewareNoError
 */

/**
 * @typedef {(
 *   err: Error,
 *   req: ChaiConnectRequest,
 *   res: import('./response.js').default,
 *   next: import('@passport-next/http-types').NextFunction
 * ) => void} ChaiConnectMiddlewareWithError
 */

/**
 * @typedef {ChaiConnectMiddlewareNoError | ChaiConnectMiddlewareWithError} ChaiConnectMiddleware
 */

/**
 * @typedef {(
 *   req: ChaiConnectRequest
 * ) => void} SyncRequestCallback
 */

/**
 * @typedef {(
 *   req: ChaiConnectRequest,
 *   done: () => void
 * ) => void} AsyncRequestCallback
 */

/**
 * @typedef {SyncRequestCallback | AsyncRequestCallback} RequestCallback
 */

/**
 * @typedef {(res: import('./response.js').default) => void} ResponseCallback
 */

/**
 * @typedef {(
 *   res: import('./response.js').default
 * ) => void} EndCallback
 */

/**
 * @typedef {(err?: Error) => void} NextCallback
 */

/**
 * Creates an instance of `Test`.
 *
 * @class
 * @protected
 */
class Test {
  /** @type {RequestCallback | undefined} */
  #req;

  /** @type {ResponseCallback | undefined} */
  #res;

  /** @type {EndCallback | undefined} */
  #end;

  /** @type {NextCallback | undefined} */
  #next;

  /** @type {ChaiConnectMiddleware} */
  #middleware;

  /** @type {"express" | undefined} */
  #extensions;

  /**
   * @overload
   * @param {"express"} extensions
   * @param {ChaiConnectMiddleware} middleware
   */

  /**
   * @overload
   * @param {ChaiConnectMiddleware} middleware
   */

  /**
   * @param {"express"|ChaiConnectMiddleware} extensions
   * @param {ChaiConnectMiddleware} [middleware]
   */
  constructor(extensions, middleware) {
    if (typeof extensions === 'function') {
      this.#middleware = extensions;
      this.#extensions = undefined;
    } else {
      this.#middleware = /** @type {ChaiConnectMiddleware} */ (middleware);
      this.#extensions = extensions;
    }
  }

  /**
   * Register a callback to be invoked when request is prepared.
   *
   * @public
   * @overload
   * @param {SyncRequestCallback} cb
   * @returns {Test} for chaining
   */

  /**
   * @public
   * @overload
   * @param {AsyncRequestCallback} cb
   * @returns {Test} for chaining
  */

  /**
   * @public
   * @param {RequestCallback} cb
   * @returns {Test} for chaining
   */
  req(cb) {
    this.#req = cb;
    return this;
  }

  /**
   * Register a callback to be invoked when response is prepared.
   *
   * @public
   * @param {ResponseCallback} cb
   * @returns {Test} for chaining
   */
  res(cb) {
    this.#res = cb;
    return this;
  }

  /**
   * Register a callback to be invoked when middleware `end()`s response.
   *
   * @public
   * @param {EndCallback} cb
   * @returns {Test} for chaining
   */
  end(cb) {
    this.#end = cb;
    return this;
  }

  /**
   * Register a callback to be invoked when middleware calls `next()`.
   *
   * @public
   * @param {NextCallback} cb
   * @returns {Test} for chaining
   */
  next(cb) {
    this.#next = cb;
    return this;
  }

  /**
   * Dispatch mock request to middleware.
   *
   * @public
   * @param {Error} [err]
   * @returns {void}
   */
  dispatch(err) {
    const req = new Request(),
      before = this.#req;

    /**
     * @returns {void}
     */
    const ready = () => {
      const res =
        /**
         * @type {import('./response.js').default & {
         *     redirect?: import('./express/response.js').Redirect
         * }}
         */ (
          new Response(() => {
            if (!this.#end) {
              throw new Error('res#end should not be called');
            }
            this.#end.call(null, res);
          })
        );

      if (this.#extensions === 'express') {
        res.redirect = exres.redirect;
      }

      if (this.#res) {
        this.#res(res);
      }

      /**
       *
       * @throws {Error}
       * @param {unknown} [error]
       * @returns {void}
       */
      const next = (error) => {
        if (!this.#next) {
          throw new Error('next should not be called');
        }
        this.#next.call(null, /** @type {Error | undefined} */ (error));
      };

      if (err) {
        /** @type {ChaiConnectMiddlewareWithError} */ (this.#middleware)(
          err,
          req,
          res,
          next
        );
      } else {
        /** @type {ChaiConnectMiddlewareNoError} */ (this.#middleware)(
          req,
          res,
          next
        );
      }
    };

    if (before && before.length === 2) {
      /** @type {AsyncRequestCallback} */ (before)(req, ready);
    } else if (before) {
      /** @type {SyncRequestCallback} */ (before)(req);
      ready();
    } else {
      ready();
    }
  }
}

/**
 * Expose `Test`.
 */
export default Test;
