/* eslint-disable no-shadow -- Convenient */
import { expect } from 'chai';
import Test from '../lib/test.js';

describe('test error middleware that calls next with error', () => {
  /** @type {import('../lib/test.js').ChaiConnectMiddlewareWithError} */
  function middleware(err, req, res, next) {
    next(err);
  }

  describe('with a next callback', () => {
    /** @type {Error|undefined} */
    let err;

    before((done) => {
      const test = new Test(middleware);
      test.next((e) => {
        err = e;
        done();
      }).dispatch(new Error('whoops'));
    });

    it('should call next callback', () => {
      expect(err).to.be.an.instanceOf(Error);
      expect(err?.message).to.equal('whoops');
    });
  });
});
