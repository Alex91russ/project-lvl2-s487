import genDiff from '..';
import fs from 'fs';

const path = '__tests__/__fixtures__/';

test('gendiff-json', () => {
  const expected = fs.readFileSync(`${path}result.txt`, 'utf8');
  expect(genDiff(`${path}json/before.json`, `${path}json/after.json`, 'test')).toBe(expected);
});
