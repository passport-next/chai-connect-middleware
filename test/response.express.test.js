/* eslint-disable no-shadow -- Convenient */
import { expect } from 'chai';
import Response from '../lib/response.js';
import * as ext from '../lib/express/response.js';

/**
 * @typedef {import('../lib/response.js').default & {
 *   redirect?: import('../lib/express/response.js').Redirect
 * }} ResponseWithRedirect
 */

describe('Response', () => {
  describe('#redirect', () => {
    /** @type {ResponseWithRedirect} */
    let res;

    // eslint-disable-next-line mocha/handle-done-callback -- Bug
    before((done) => {
      res = new Response(() => {
        queueMicrotask(done);
      });
      res.redirect = ext.redirect;

      res.redirect('https://www.example.com/foo');
    });

    it('should get set status and location', () => {
      expect(res.statusCode).to.equal(302);
      expect(res.getHeader('Location')).to.equal('https://www.example.com/foo');
    });
  });

  describe('#redirect with status', () => {
    /** @type {ResponseWithRedirect} */
    let res;

    // eslint-disable-next-line mocha/handle-done-callback -- Bug
    before((done) => {
      res = new Response(() => {
        queueMicrotask(done);
      });
      res.redirect = ext.redirect;

      res.redirect('https://www.example.com/foo', 303);
    });

    it('should get set status and location', () => {
      expect(res.statusCode).to.equal(303);
      expect(res.getHeader('Location')).to.equal('https://www.example.com/foo');
    });
  });
});
