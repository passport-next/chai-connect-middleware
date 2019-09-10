/* global describe, it, before, expect */
/* eslint-disable no-shadow */
'use strict';

const Test = require('../lib/test');

describe('test middleware that prepares response', () => {
  function middleware(req, res) {
    res.end();
  }

  describe('sync', () => {
    describe('and dispatches', () => {
      let pres, eres;

      before((done) => {
        const test = new Test(middleware);
        test.res((res) => {
          pres = res;
        }).end((r) => {
          eres = r;
          done();
        }).dispatch();
      });

      it('should get same response from preparation and end', () => {
        expect(pres).to.be.equal(eres);
      });
    });
  });
});
