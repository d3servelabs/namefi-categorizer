import { describe, expect, test } from '@jest/globals';
import { getPureNumberClub } from './number-club';

describe('Number Club', () => {
  test('Should return 999 Club when pass-in 999', () => {
    expect(getPureNumberClub('999')).toBe('999 Club');
  });

  test('Should return 999 Club when pass-in 001', () => {
    expect(getPureNumberClub('001')).toBe('999 Club');
  });

  test('Should return 10k Club when pass-in 1245', () => {
    expect(getPureNumberClub('1245')).toBe('10k Club');
  });

  test('Should return 10k Club when pass-in 0245', () => {
    expect(getPureNumberClub('0245')).toBe('10k Club');
  });

  test('Should return 100k Club when pass-in 38271', () => {
    expect(getPureNumberClub('38271')).toBe('100k Club');
  });

  test('Should return 100k Club when pass-in 06660', () => {
    expect(getPureNumberClub('06660')).toBe('100k Club');
  });
});
