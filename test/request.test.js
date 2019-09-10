/* global describe, it, expect */
'use strict';

const Request = require('../lib/request');

describe('Request', () => {
  const req = new Request();

  it('should be constructed with default properties', () => {
    expect(Object.keys(req)).to.have.length(3);
    expect(req.method).to.equal('GET');
    expect(req.url).to.equal('/');
    expect(req.headers).to.be.an('object');
  });
});
