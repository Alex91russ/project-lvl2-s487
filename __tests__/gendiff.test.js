import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const pathToFixtures = '__tests__/__fixtures__/';
const pathToResults = '__tests__/__fixtures__/results/';

const tableForFixtures = [
  ['before.json', 'after.json', 'tree', 'result.txt'],
  ['before.yml', 'after.yml', 'tree', 'result.txt'],
  ['before.ini', 'after.ini', 'tree', 'result.txt'],
  ['before.json', 'after.json', 'plain', 'resultPlain.txt'],
  ['before.yml', 'after.yml', 'plain', 'resultPlain.txt'],
  ['before.ini', 'after.ini', 'plain', 'resultPlain.txt'],
  ['before.json', 'after.json', 'json', 'resultJson.txt'],
  ['before.yml', 'after.yml', 'json', 'resultJson.txt'],
  ['before.ini', 'after.ini', 'json', 'resultJsonIni.txt'],
  ['beforeWithAttachments.json', 'afterWithAttachments.json', 'tree', 'resultWithAttachments.txt'],
  ['beforeWithAttachments.yml', 'afterWithAttachments.yml', 'tree', 'resultWithAttachments.txt'],
  ['beforeWithAttachments.ini', 'afterWithAttachments.ini', 'tree', 'resultWithAttachments.txt'],
  ['beforeWithAttachments.json', 'afterWithAttachments.json', 'plain', 'resultPlainWithAttachments.txt'],
  ['beforeWithAttachments.yml', 'afterWithAttachments.yml', 'plain', 'resultPlainWithAttachments.txt'],
  ['beforeWithAttachments.ini', 'afterWithAttachments.ini', 'plain', 'resultPlainWithAttachments.txt'],
  ['beforeWithAttachments.json', 'afterWithAttachments.json', 'json', 'resultJsonWithAttachmentsIni.txt'],
  ['beforeWithAttachments.yml', 'afterWithAttachments.yml', 'json', 'resultJsonWithAttachments.txt'],
  ['beforeWithAttachments.ini', 'afterWithAttachments.ini', 'json', 'resultJsonWithAttachmentsIni.txt'],
];

test.each(tableForFixtures)(
  'gendiff %s, %s, %s',
  (firstFile, secondFile, format, expectedFile) => {
    const formatFile = path.extname(firstFile).slice(1);

    const firstPath = path.join(pathToFixtures, formatFile, firstFile);
    const secondPath = path.join(pathToFixtures, formatFile, secondFile);
    const pathToResult = path.join(pathToResults, expectedFile);

    const result = genDiff(firstPath, secondPath, format);
    const expected = fs.readFileSync(pathToResult, 'utf-8');

    expect(result).toBe(expected);
  },
);
