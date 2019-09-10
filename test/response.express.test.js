/* global describe, it, before, expect */
'use strict';

const Response = require('../lib/response'),
  ext = require('../lib/express/response');

describe('Response', () => {
  describe('#redirect', () => {
    let res;

    before((done) => {
      res = new Response(() => {
        process.nextTick(done);
      });
      res.redirect = ext.redirect;

      res.redirect('http://www.example.com/foo');
    });

    it('should get set status and location', () => {
      expect(res.statusCode).to.equal(302);
      expect(res.getHeader('Location')).to.equal('http://www.example.com/foo');
    });
  });

  describe('#redirect with status', () => {
    let res;

    before((done) => {
      res = new Response(() => {
        process.nextTick(done);
      });
      res.redirect = ext.redirect;

      res.redirect('http://www.example.com/foo', 303);
    });

    it('should get set status and location', () => {
      expect(res.statusCode).to.equal(303);
      expect(res.getHeader('Location')).to.equal('http://www.example.com/foo');
    });
  });
});
