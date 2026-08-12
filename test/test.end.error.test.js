/* eslint-disable no-shadow -- Convenient */
import { expect } from 'chai';
import Test from '../lib/test.js';

describe('test error middleware that calls end', () => {
  /** @type {import('../lib/test.js').ChaiConnectMiddlewareWithError} */
  function middleware(err, req, res) {
    res.statusCode = 500;
    res.end(err.message);
  }

  describe('with an end callback', () => {
    /** @type {import('../lib/response.js').default} */
    let res;

    before((done) => {
      const test = new Test(middleware);
      test.end((r) => {
        res = r;
        done();
      }).dispatch(new Error('something went wrong'));
    });

    it('should call end callback', () => {
      expect(res.statusCode).to.be.equal(500);
      expect(res.body).to.be.equal('something went wrong');
    });
  });
});
