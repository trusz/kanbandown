import { describe, it, expect } from 'vitest';
import { convertToFileName, removeDuplicateSpaces } from './filename';

type ConvertToFileNameTestCase = {
  input: string;
  expectedOutput: string;
};

describe('convertToFileName', () => {
  const testCases: ConvertToFileNameTestCase[] = [
    {
      input: 'Hello, world!',
      expectedOutput: 'hello_world.md',
    },
    {
      input: 'This is a test string!',
      expectedOutput: 'this_is_a_test_string.md',
    },
    {
      input: '1234',
      expectedOutput: '1234.md',
    },
    {
      input: 'special characters !@#$%^&*()',
      expectedOutput: 'special_characters.md',
    },
    {
      input: ' trims any leading or trailing spaces ',
      expectedOutput: 'trims_any_leading_or_trailing_spaces.md',
    },
    {
      input: 'UpperCase',
      expectedOutput: 'uppercase.md',
    },
    {
      input: 'remove spaces and ? and =',
      expectedOutput: 'remove_spaces_and_and.md',
    },
  ];

  testCases.forEach(({ input, expectedOutput }) => {
    it(`should convert "${input}" to "${expectedOutput}"`, () => {
      const result = convertToFileName(input);
      expect(result).toEqual(expectedOutput);
    });
  });
});

describe('removeDuplicateSpaces', () => {
  const testCases = [
    { input: 'This   is    a  string   with   extra   spaces.', expected: 'This is a string with extra spaces.' },
    { input: '  A   string   with   no  extra  spaces.   ', expected: 'A string with no extra spaces.' },
    { input: '   A   string   with   only   one   space.   ', expected: 'A string with only one space.' },
    { input: '', expected: '' },
  ];

  testCases.forEach(({ input, expected }) => {
    it(`should remove duplicate spaces from "${input}"`, () => {
      expect(removeDuplicateSpaces(input)).toEqual(expected);
    });
  });
});
