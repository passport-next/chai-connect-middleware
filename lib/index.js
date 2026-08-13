import Test from './test.js';

/**
 * @overload
 * @param {import('./test.js').ChaiConnectMiddleware} middleware
 * @returns {Test}
 */

/**
 * @overload
 * @param {"express"} extensions
 * @param {import('./test.js').ChaiConnectMiddleware} middleware
 * @returns {Test}
 */

/**
 * @param {"express"|import('./test.js').ChaiConnectMiddleware} extensions
 * @param {import('./test.js').ChaiConnectMiddleware} [middleware]
 * @returns {Test}
 */
function use(extensions, middleware) {
  if (typeof extensions === 'function') {
    return new Test(extensions);
  }
  return new Test(
    extensions,
    /** @type {import('./test.js').ChaiConnectMiddleware} */ (middleware)
  );
}

/**
 *
 * @param {{connect?: {use?: typeof use}}} chai
 * @returns {void}
 */
function chaiConnectMiddleware(chai /* , _ */) {
  chai.connect ||= {};
  chai.connect.use = use;
}

export default chaiConnectMiddleware;
