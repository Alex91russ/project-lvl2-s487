import fs from 'fs';
import genDiff from '../src';

const path = '__tests__/__fixtures__/';
const expected = fs.readFileSync(`${path}result.txt`, 'utf8');
const expected2 = fs.readFileSync(`${path}resultWithAttachments.txt`, 'utf8');

const arrayForTestJson = [
  `${path}json/before.json`,
  `${path}json/after.json`,
];

const arrayWithAttachForTestJson = [
  `${path}json/beforeWithAttachments.json`,
  `${path}json/afterWithAttachments.json`,
];

const arrayForTestYml = [
  `${path}yml/before.yml`,
  `${path}yml/after.yml`,
];

const arrayWithAttachForTestYml = [
  `${path}yml/beforeWithAttachments.yml`,
  `${path}yml/afterWithAttachments.yml`,
];

const arrayForTestIni = [
  `${path}ini/before.ini`,
  `${path}ini/after.ini`,
];

const arrayWithAttachForTestIni = [
  `${path}ini/beforeWithAttachments.ini`,
  `${path}ini/afterWithAttachments.ini`,
];

test.each([arrayForTestJson, arrayForTestYml, arrayForTestIni])(
  'test for genDiff(%s, %s)',
  (firstPath, secondPath) => {
    expect(genDiff(firstPath, secondPath)).toBe(expected);
  },
);

test.each([arrayWithAttachForTestJson, arrayWithAttachForTestYml, arrayWithAttachForTestIni])(
  'test for genDiff(%s, %s)',
  (firstPath, secondPath) => {
    expect(genDiff(firstPath, secondPath)).toBe(expected2);
  },
);
