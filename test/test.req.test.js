/* eslint-disable no-shadow -- Convenient */
import { expect } from 'chai';
import Test from '../lib/test.js';

describe('test middleware that prepares request', () => {
  /**
   * @type {(
  *   req: import('../types/index.js').Request,
   *   res: import('../lib/response.js').default,
   *   next: (error?: Error) => void
   * ) => void}
   */
  function middleware(req, res) {
    res.end(req?.query?.hello);
  }

  describe('sync', () => {
    describe('and dispatches', () => {
      /** @type {import('../lib/response.js').default} */
      let res;

      before((done) => {
        const test = new Test(middleware);
        test.req((req) => {
          req.query = { hello: 'World' };
        }).end((r) => {
          res = r;
          done();
        }).dispatch();
      });

      it('should not have Express extensions', () => {
        expect('redirect' in res).to.equal(false);
      });

      it('should call end callback', () => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.equal('World');
      });
    });

    describe('and dispatches with Express extensions', () => {
      /** @type {import('../lib/response.js').default} */
      let res;

      before((done) => {
        const test = new Test('express', middleware);
        test.req((req) => {
          req.query = { hello: 'World' };
        }).end((r) => {
          res = r;
          done();
        }).dispatch();
      });

      it('should have Express extensions', () => {
        expect('redirect' in res && res.redirect).to.be.a('function');
      });

      it('should call end callback', () => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.equal('World');
      });
    });
  });

  describe('async', () => {
    describe('and dispatches', () => {
      /** @type {import('../lib/response.js').default} */
      let res;

      before((done) => {
        const test = new Test(middleware);
        test.req((
          /** @type {import('../types/index.js').Request} */ req,
          /** @type {() => void} */ done
        ) => {
          req.query = { hello: 'Async World' };
          queueMicrotask(done);
        }).end((r) => {
          res = r;
          done();
        }).dispatch();
      });

      it('should call end callback', () => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.equal('Async World');
      });
    });
  });
});
