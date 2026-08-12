export type Redirect = (@this {{
 *   statusCode: number,
 *   setHeader: (header: string, url: string) => void
 *   end: () => void
 * }}
 * : {
    statusCode: number;
    setHeader: (header: string, url: string) => void;
    end: () => void;
}, url: string, status?: number) => void;
/**
 * @callback Redirect
 * @this {{
 *   statusCode: number,
 *   setHeader: (header: string, url: string) => void
 *   end: () => void
 * }}
 * @param {string} url
 * @param {number} [status]
 * @returns {void}
 */
/** @type {Redirect} */
export declare const redirect: Redirect;
