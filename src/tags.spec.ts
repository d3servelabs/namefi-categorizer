import {describe, expect, test} from '@jest/globals';
import {getTags} from './tags';

describe('Tags', () => {

  test('Should correctly get tag for 888.com', () => {
    let tags = getTags('888.com');
    expect(tags).toContain('.com TLD');
    expect(tags).toContain('Pure Number');
    expect(tags).toContain('999 Club');
  });
});