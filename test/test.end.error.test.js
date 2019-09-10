/* global describe, it, before, expect */
/* eslint-disable no-shadow */
'use strict';

const Test = require('../lib/test');

describe('test error middleware that calls end', () => {
  function middleware(err, req, res) {
    res.statusCode = 500;
    res.end(err.message);
  }

  describe('with an end callback', () => {
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
