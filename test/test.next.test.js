/* global describe, it, before, expect */
/* eslint-disable no-shadow */
'use strict';

const Test = require('../lib/test');

describe('test middleware that calls next', () => {
  function middleware(req, res, next) {
    next();
  }

  describe('with a next callback', () => {
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
  function middleware(req, res, next) {
    next(new Error('oops'));
  }

  describe('with a next callback', () => {
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
      expect(err.message).to.equal('oops');
    });
  });
});
