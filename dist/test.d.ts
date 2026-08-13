export type ChaiConnectMiddlewareNoError = import('@passport-next/http-types').Middleware<import('./request.js').default, import('./response.js').default>;
export type ChaiConnectMiddlewareWithError = (err: Error, req: import('./request.js').default, res: import('./response.js').default, next: import('@passport-next/http-types').NextFunction) => void;
export type ChaiConnectMiddleware = ChaiConnectMiddlewareNoError | ChaiConnectMiddlewareWithError;
export type SyncRequestCallback = (req: import('./request.js').default) => void;
export type AsyncRequestCallback = (req: import('./request.js').default, done: () => void) => void;
export type RequestCallback = SyncRequestCallback | AsyncRequestCallback;
export type ResponseCallback = (res: import('./response.js').default) => void;
export type EndCallback = (res: import('./response.js').default) => void;
export type NextCallback = (err?: Error) => void;
/**
 * @typedef {import('@passport-next/http-types').Middleware<
 *   import('./request.js').default,
 *   import('./response.js').default
 * >} ChaiConnectMiddlewareNoError
 */
/**
 * @typedef {(
 *   err: Error,
 *   req: import('./request.js').default,
 *   res: import('./response.js').default,
 *   next: import('@passport-next/http-types').NextFunction
 * ) => void} ChaiConnectMiddlewareWithError
 */
/**
 * @typedef {ChaiConnectMiddlewareNoError | ChaiConnectMiddlewareWithError} ChaiConnectMiddleware
 */
/**
 * @typedef {(
 *   req: import('./request.js').default
 * ) => void} SyncRequestCallback
 */
/**
 * @typedef {(
 *   req: import('./request.js').default,
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
declare class Test {
    #private;
    constructor(extensions: "express", middleware: ChaiConnectMiddleware);
    constructor(middleware: ChaiConnectMiddleware);
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
    req(cb: SyncRequestCallback): Test;
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
    req(cb: AsyncRequestCallback): Test;
    /**
     * Register a callback to be invoked when response is prepared.
     *
     * @public
     * @param {ResponseCallback} cb
     * @returns {Test} for chaining
     */
    res(cb: ResponseCallback): Test;
    /**
     * Register a callback to be invoked when middleware `end()`s response.
     *
     * @public
     * @param {EndCallback} cb
     * @returns {Test} for chaining
     */
    end(cb: EndCallback): Test;
    /**
     * Register a callback to be invoked when middleware calls `next()`.
     *
     * @public
     * @param {NextCallback} cb
     * @returns {Test} for chaining
     */
    next(cb: NextCallback): Test;
    /**
     * Dispatch mock request to middleware.
     *
     * @public
     * @param {Error} [err]
     * @returns {void}
     */
    dispatch(err?: Error): void;
}
/**
 * Expose `Test`.
 */
export default Test;
