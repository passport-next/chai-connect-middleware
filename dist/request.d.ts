/** @import {ConnectRequest} from '@passport-next/http-types' */
import type { ConnectRequest } from '@passport-next/http-types';
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
declare class Request implements ConnectRequest {
    method: string;
    url: string;
    /** @type {Record<string, import('@passport-next/http-types').HeaderValue>} */
    headers: Record<string, import('@passport-next/http-types').HeaderValue>;
}
/**
 * Expose `Request`.
 */
export default Request;
