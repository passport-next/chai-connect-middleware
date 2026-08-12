/* eslint-disable no-shadow -- Convenient */
import { expect } from 'chai';
import Test from '../lib/test.js';

describe('test middleware that calls next', () => {
  /** @type {import('../lib/test.js').ChaiConnectMiddlewareNoError} */
  function middleware(req, res, next) {
    next();
  }

  describe('with a next callback', () => {
    /** @type {Error|undefined} */
    let err;

    before((done) => {
      const test = new Test(middleware);
      test.next((e) => {
        err = e;
        done();
      }).dispatch();
    });

    it('should call next callback', () => {
      expect(err).to.be.a('undefined');
    });
  });

  describe('without a next callback', () => {
    it('should throw an error', () => {
      expect(() => {
        const test = new Test(middleware);
        test.dispatch();
      }).to.throw(Error, 'next should not be called');
    });
  });
});

describe('test middleware that calls next with error', () => {
  /** @type {import('../lib/test.js').ChaiConnectMiddlewareNoError} */
  function middleware(req, res, next) {
    next(new Error('oops'));
  }

  describe('with a next callback', () => {
    /** @type {Error|undefined} */
    let err;

    before((done) => {
      const test = new Test(middleware);
      test.next((e) => {
        err = e;
        done();
      }).dispatch();
    });

    it('should call next callback', () => {
      expect(err).to.be.an.instanceOf(Error);
      expect(err?.message).to.equal('oops');
    });
  });
});
