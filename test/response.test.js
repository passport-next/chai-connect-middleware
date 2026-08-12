/* eslint-disable no-shadow -- Convenient */
import { expect } from 'chai';
import Response from '../lib/response.js';

describe('Response', () => {
  describe('constructor', () => {
    const res = new Response();

    it('should be constructed with default properties', () => {
      expect(Object.keys(res)).to.have.length(2);
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
    /** @type {import('../lib/response.js').default} */
    let res;

    // eslint-disable-next-line mocha/handle-done-callback -- Bug
    before((done) => {
      res = new Response(() => {
        queueMicrotask(done);
      });
      res.end();
    });

    it('should get set status and not body', () => {
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.a('undefined');
    });
  });

  describe('#end with data', () => {
    /** @type {import('../lib/response.js').default} */
    let res;

    // eslint-disable-next-line mocha/handle-done-callback -- Bug
    before((done) => {
      res = new Response(() => {
        queueMicrotask(done);
      });
      res.end('Hello');
    });

    it('should get set status and body', () => {
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal('Hello');
    });
  });
});
