/* eslint-disable no-shadow -- Convenient */
import { expect } from 'chai';
import Test from '../lib/test.js';

describe('test middleware that calls end', () => {
  /** @type {import('../lib/test.js').ChaiConnectMiddlewareNoError} */
  function middleware(req, res) {
    res.end('Hello');
  }

  describe('with an end callback', () => {
    /** @type {import('../lib/response.js').default} */
    let res;

    before((done) => {
      const test = new Test(middleware);
      test.end((r) => {
        res = r;
        done();
      }).dispatch();
    });

    it('should call end callback', () => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.be.equal('Hello');
    });
  });

  describe('without an end callback', () => {
    it('should throw an error', () => {
      expect(() => {
        const test = new Test(middleware);
        test.dispatch();
      }).to.throw(Error, 'res#end should not be called');
    });
  });
});
