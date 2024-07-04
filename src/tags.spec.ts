import {describe, expect, test} from '@jest/globals';
import {getTags} from './tags';

describe('Tags', () => {

  test('Should correctly get tag for 888.com', () => {
    let tagIds = getTags('888.com').map(tag => tag.id);
    expect(tagIds).toContain('tld_com');
    expect(tagIds).toContain('num_3d');
    expect(tagIds).toContain('length_3');
  });

  test('Should correctly get tag for abandon.com', () => {
    let tagIds = getTags('abandon.com').map(tag => tag.id);
    expect(tagIds).toContain('tld_com');
    expect(tagIds).toContain('length_7');
    expect(tagIds).toContain('en_gwtwc_100k');
  });
});