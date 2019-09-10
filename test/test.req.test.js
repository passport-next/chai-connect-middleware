/* global describe, it, before, expect */
/* eslint-disable no-shadow */
'use strict';

const Test = require('../lib/test');

describe('test middleware that prepares request', () => {
  function middleware(req, res) {
    res.end(req.query.hello);
  }

  describe('sync', () => {
    describe('and dispatches', () => {
      let res;

      before((done) => {
        const test = new Test(middleware);
        test.req((req) => {
          req.query = {};
          req.query.hello = 'World';
        }).end((r) => {
          res = r;
          done();
        }).dispatch();
      });

      it('should not have Express extensions', () => {
        expect(res.redirect).to.be.a('undefined');
      });

      it('should call end callback', () => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.equal('World');
      });
    });

    describe('and dispatches with Express extensions', () => {
      let res;

      before((done) => {
        const test = new Test('express', middleware);
        test.req((req) => {
          req.query = {};
          req.query.hello = 'World';
        }).end((r) => {
          res = r;
          done();
        }).dispatch();
      });

      it('should have Express extensions', () => {
        expect(res.redirect).to.be.a('function');
      });

      it('should call end callback', () => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.equal('World');
      });
    });
  });

  describe('async', () => {
    describe('and dispatches', () => {
      let res;

      before((done) => {
        const test = new Test(middleware);
        test.req((req, done) => {
          req.query = {};
          req.query.hello = 'Async World';
          process.nextTick(done);
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
