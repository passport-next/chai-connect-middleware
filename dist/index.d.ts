import Test from './test.js';
export type Request = import('./request.js').default;
export type Response = import('./response.js').default;
declare function use(middleware: import('./test.js').ChaiConnectMiddleware): Test;
declare function use(extensions: "express", middleware: import('./test.js').ChaiConnectMiddleware): Test;
/**
 *
 * @param {{connect?: {use?: typeof use}}} chai
 * @returns {void}
 */
declare function chaiConnectMiddleware(chai: {
    connect?: {
        use?: typeof use;
    };
}): void;
export default chaiConnectMiddleware;
