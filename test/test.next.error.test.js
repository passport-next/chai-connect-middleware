/* global describe, it, before, expect */
/* eslint-disable no-shadow */
'use strict';

const Test = require('../lib/test');

describe('test error middleware that calls next with error', () => {
  function middleware(err, req, res, next) {
    next(err);
  }

  describe('with a next callback', () => {
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
      expect(err.message).to.equal('whoops');
    });
  });
});
