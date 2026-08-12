/* eslint-disable no-shadow -- Convenient */
import { expect } from 'chai';
import Test from '../lib/test.js';

describe('test middleware that prepares response', () => {
  /**
   * @param {import('../lib/request.js').default} req
   * @param {import('../lib/response.js').default} res
   * @returns {void}
   */
  function middleware(req, res) {
    res.end();
  }

  describe('sync', () => {
    describe('and dispatches', () => {
      /** @type {import('../lib/response.js').default} */
      let pres;
      /** @type {import('../lib/response.js').default} */
      let eres;

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
