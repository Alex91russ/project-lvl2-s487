import fs from 'fs';
import genDiff from '../src';

const path = '__tests__/__fixtures__/';
const expected = fs.readFileSync(`${path}results/result.txt`, 'utf8');
const expected2 = fs.readFileSync(`${path}results/resultWithAttachments.txt`, 'utf8');
const expected3 = fs.readFileSync(`${path}results/resultPlain.txt`, 'utf8');
const expected4 = fs.readFileSync(`${path}results/resultPlainWithAttachments.txt`, 'utf8');
const expected5 = fs.readFileSync(`${path}results/resultJson.txt`, 'utf8');
const expected6 = fs.readFileSync(`${path}results/resultJsonWithAttachments.txt`, 'utf8');
const expected7 = fs.readFileSync(`${path}results/resultJsonIni.txt`, 'utf8');
const expected8 = fs.readFileSync(`${path}results/resultJsonWithAttachmentsIni.txt`, 'utf8');


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

const arrayWithAttachForTestJson = [
  `${path}json/beforeWithAttachments.json`,
  `${path}json/afterWithAttachments.json`,
];

const arrayWithAttachForTestYml = [
  `${path}yml/beforeWithAttachments.yml`,
  `${path}yml/afterWithAttachments.yml`,
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

test.each([arrayForTestJson, arrayForTestYml, arrayForTestIni])(
  'test for genDiff(%s, %s)',
  (firstPath, secondPath) => {
    expect(genDiff(firstPath, secondPath, 'plain')).toBe(expected3);
  },
);

test.each([arrayForTestJson, arrayForTestYml])(
  'test for genDiff(%s, %s)',
  (firstPath, secondPath) => {
    expect(genDiff(firstPath, secondPath, 'json')).toBe(expected5);
  },
);

test.each([arrayForTestIni])(
  'test for genDiff(%s, %s)',
  (firstPath, secondPath) => {
    expect(genDiff(firstPath, secondPath, 'json')).toBe(expected7);
  },
);

test.each([arrayWithAttachForTestJson, arrayWithAttachForTestYml, arrayWithAttachForTestIni])(
  'test for genDiff(%s, %s))',
  (firstPath, secondPath) => {
    expect(genDiff(firstPath, secondPath)).toBe(expected2);
  },
);

test.each([arrayWithAttachForTestJson, arrayWithAttachForTestYml, arrayWithAttachForTestIni])(
  'test for genDiff(%s, %s))',
  (firstPath, secondPath) => {
    expect(genDiff(firstPath, secondPath, 'plain')).toBe(expected4);
  },
);

test.each([arrayWithAttachForTestYml])(
  'test for genDiff(%s, %s))',
  (firstPath, secondPath) => {
    expect(genDiff(firstPath, secondPath, 'json')).toBe(expected6);
  },
);

test.each([arrayWithAttachForTestJson, arrayWithAttachForTestIni])(
  'test for genDiff(%s, %s))',
  (firstPath, secondPath) => {
    expect(genDiff(firstPath, secondPath, 'json')).toBe(expected8);
  },
);
