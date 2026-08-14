import type Test from '../dist/test.js';
import type { ChaiConnectMiddleware } from '../dist/test.js';
import type { RequestExtensions } from '../request-extensions.js';

export type { RequestExtensions } from '../request-extensions.js';

export type Request =
  import('../dist/request.js').default & RequestExtensions;
export type Response = import('../dist/response.js').default;

declare global {
  namespace Chai {
    interface ChaiConnect {
      use(middleware: ChaiConnectMiddleware): Test;
      use(
        extensions: 'express',
        middleware: ChaiConnectMiddleware
      ): Test;
    }

    interface ChaiStatic {
      connect: ChaiConnect;
    }
  }
}

declare function chaiConnectMiddleware(chai: Chai.ChaiStatic): void;

export default chaiConnectMiddleware;
