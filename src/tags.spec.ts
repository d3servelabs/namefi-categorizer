import {describe, expect, test} from '@jest/globals';
import {getTags} from './tags';

describe('Tags', () => {

  test("Should correctly get tag for 888.com", () => {
    const tags = getTags("888.com");
    expect(tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: ".com TLD",
        }),
        expect.objectContaining({
          name: "999 Club",
        }),
      ])
    );
  });

  test("Should correctly get tag for example.com", () => {
    const tags = getTags("example.com");
    expect(tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: ".com TLD",
        }),
        expect.objectContaining({
          name: "7 Digit Club",
        }),
        expect.objectContaining({
          name: "English Top 1K",
        }),
      ])
    );
  });
});