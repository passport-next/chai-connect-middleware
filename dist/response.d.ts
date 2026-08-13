/** @import {ConnectResponse, ResponseHeaderValue} from '@passport-next/http-types' */
import type { ConnectResponse, ResponseHeaderValue } from '@passport-next/http-types';
export type ResponseCallback = () => void;
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
declare class Response implements ConnectResponse {
    #private;
    /** @type {string | undefined} */
    body: string | undefined;
    statusCode: number;
    /**
     * @param {ResponseCallback} [cb]
     */
    constructor(cb?: ResponseCallback);
    /**
     * @param {string} name
     * @returns {ResponseHeaderValue | undefined}
     */
    getHeader(name: string): ResponseHeaderValue | undefined;
    /**
     * @param {string} name
     * @param {ResponseHeaderValue} value
     * @returns {void}
     */
    setHeader(name: string, value: ResponseHeaderValue): void;
    /**
     * @param {unknown} [data]
     * @returns {void}
     */
    end(data?: unknown): void;
}
/**
 * Expose `Response`.
 */
export default Response;
