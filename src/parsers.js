import fs from 'fs';
import path from 'path';
import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.ini': parse,
};

export default (filePath) => {
  const date = fs.readFileSync(filePath, 'utf-8');
  const fileExtension = path.extname(filePath);
  return parsers[fileExtension](date);
};
