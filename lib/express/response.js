/* eslint-disable unicorn/no-this-outside-of-class -- Conditionally applied */

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
export const redirect = function redirect(url, status) {
  this.statusCode = status || 302;
  this.setHeader('Location', url);
  this.end();
};
