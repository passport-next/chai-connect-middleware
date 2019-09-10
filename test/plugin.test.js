/* global describe, it, expect */
/* eslint-disable no-shadow */
'use strict';

const Test = require('../lib/test');
const plugin = require('..');

describe('plugin', () => {
  const chai = {};
  plugin(chai);

  it('should add connect helper to chai', () => {
    expect(chai.connect).to.be.an('object');
    expect(chai.connect.use).to.be.a('function');
  });

  describe('when invoked', () => {
    const test = chai.connect.use({});

    it('should return test wrapper', () => {
      expect(test).to.be.an.instanceOf(Test);
    });
  });
});
