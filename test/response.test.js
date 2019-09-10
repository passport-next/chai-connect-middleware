/* global describe, it, before, expect */
'use strict';

const Response = require('../lib/response');

describe('Response', () => {
  describe('constructor', () => {
    const res = new Response();

    it('should be constructed with default properties', () => {
      expect(Object.keys(res)).to.have.length(4);
      expect(res.statusCode).to.equal(200);
    });
  });

  describe('#setHeader', () => {
    const res = new Response();
    res.setHeader('Content-Type', 'application/json');

    it('should get set header', () => {
      expect(res.getHeader('Content-Type')).to.equal('application/json');
    });
  });

  describe('#end', () => {
    let res;

    before((done) => {
      res = new Response(() => {
        process.nextTick(done);
      });
      res.end();
    });

    it('should get set status and not body', () => {
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.a('undefined');
    });
  });

  describe('#end with data', () => {
    let res;

    before((done) => {
      res = new Response(() => {
        process.nextTick(done);
      });
      res.end('Hello');
    });

    it('should get set status and body', () => {
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal('Hello');
    });
  });
});
