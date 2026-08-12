/* eslint-disable no-shadow -- Convenient */
import { expect, use } from 'chai';
import plugin from '@passport-next/chai-connect-middleware';
import Test from '../lib/test.js';

describe('plugin', () => {
  const chai = use(plugin);

  it('should add connect helper to chai', () => {
    expect(chai.connect).to.be.an('object');
    expect(chai.connect.use).to.be.a('function');
  });

  describe('when invoked', () => {
    const test = chai.connect.use(() => {});

    it('should return test wrapper', () => {
      expect(test).to.be.an.instanceOf(Test);
    });
  });

  describe('when invoked with Express extensions', () => {
    const test = chai.connect.use('express', () => {});

    it('should return test wrapper', () => {
      expect(test).to.be.an.instanceOf(Test);
    });
  });
});
