import { describe, expect, test } from '@jest/globals';
import { extractChildDomain, extractParentDomains, extractTopLevelDomain, isLdhSegmentIDN } from './domain-parser';

describe('extraction', () => {
  test('Extract the child domain of abc.123.xyz should be abc', () => {
    expect(extractChildDomain('abc.123.xyz')).toBe('abc');
  });

  test('Extract the parent domains of abc.123.xyz should be 123.xyz', () => {
    expect(extractParentDomains('abc.123.xyz')).toBe('123.xyz');
  });

  test('Extract the top level domain of abc.123.xyz should be xyz', () => {
    expect(extractTopLevelDomain('abc.123.xyz')).toBe('xyz');
  });

  test('Extract the child domain of lmn.abc.123.xyz should be lmn', () => {
    expect(extractChildDomain('lmn.abc.123.xyz')).toBe('lmn');
  });

  test('Extract the parent domains of lmn.abc.123.xyz should be abc.123.xyz', () => {
    expect(extractParentDomains('lmn.abc.123.xyz')).toBe('abc.123.xyz');
  });

  test('Extract the top level domain of lmn.abc.123.xyz should be xyz', () => {
    expect(extractTopLevelDomain('lmn.abc.123.xyz')).toBe('xyz');
  });
});

describe('isLdhSegmentIDN', () => {
  test('Should throw error when passed in a domain with other letters, e.g. Unicode like 黄飞鸿', () => {
    expect(() => isLdhSegmentIDN('黄飞鸿')).toThrowError('Domain name not a valid LDH segment');
  });

  test('Should throw error when passed in a domain with dot, s.g. abc.com', () => {
    expect(() => isLdhSegmentIDN('abc.com')).toThrowError('Domain name not a valid LDH segment');
  });

  test('Should yield true when pass-in xn--ior75kizb', () => {
    expect(isLdhSegmentIDN('xn--ior75kizb')).toBeTruthy();
  });

  test('Should yield false when pass-in abc', () => {
    expect(isLdhSegmentIDN('abc')).toBeFalsy();
  });
});
