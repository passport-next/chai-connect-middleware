/* global describe, it, expect */
'use strict';

const connect = require('..');

describe('chai-connect-middleware', () => {
  it('should export function', () => {
    expect(connect).to.be.a('function');
  });
});
