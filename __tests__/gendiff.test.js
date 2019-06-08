import fs from 'fs';
import genDiff from '../src';

const path = '__test__/__fixtures__/';

test('gendiff-json', () => {
  const expected = fs.readFileSync(`${path}result.txt`, 'utf8');
  expect(genDiff(`${path}json/before.json`, `${path}json/after.json`)).toBe(expected);
});
