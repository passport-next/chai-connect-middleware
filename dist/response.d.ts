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
 */
declare class Response {
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
     * @returns {string}
     */
    getHeader(name: string): string;
    /**
     * @param {string} name
     * @param {string} value
     * @returns {void}
     */
    setHeader(name: string, value: string): void;
    /**
     * @param {string} [data]
     * @returns {void}
     */
    end(data?: string): void;
}
/**
 * Expose `Response`.
 */
export default Response;
