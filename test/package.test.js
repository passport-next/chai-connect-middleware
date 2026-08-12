import { expect } from 'chai';
import connect from '../lib/index.js';

describe('chai-connect-middleware', () => {
  it('should export function', () => {
    expect(connect).to.be.a('function');
  });
});
