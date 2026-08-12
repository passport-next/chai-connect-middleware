/**
 * Creates an instance of `Request`.
 *
 * This class is used as a mock when testing Connect middleware, substituted in
 * place of of a Node's `http.IncomingMessage`.
 *
 * @class
 * @protected
 */
declare class Request {
    method: string;
    url: string;
    headers: {};
}
/**
 * Expose `Request`.
 */
export default Request;
