import fs from 'fs';
import genDiff from '../src';

const path = '__tests__/__fixtures__/';
const expected = fs.readFileSync(`${path}result.txt`, 'utf8');

const arrayForTestJson = [
  `${path}json/before.json`,
  `${path}json/after.json`,
];

const arrayForTestYml = [
  `${path}yml/before.yml`,
  `${path}yml/after.yml`,
];

const arrayForTestIni = [
  `${path}ini/before.ini`,
  `${path}ini/after.ini`,
];

test.each([arrayForTestJson, arrayForTestYml, arrayForTestIni])(
  'test for genDiff(%s, %s)',
  (firstPath, secondPath) => {
    expect(genDiff(firstPath, secondPath)).toBe(expected);
  },
);
