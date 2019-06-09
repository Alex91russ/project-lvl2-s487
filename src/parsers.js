import fs from 'fs';
import path from 'path';
import yml from 'js-yaml';

const jsonParser = data => JSON.parse(data);
const ymlParser = date => yml.safeLoad(date);

const parsers = {
  '.json': jsonParser,
  '.yml': ymlParser,
};

export default (filePath) => {
  const date = fs.readFileSync(filePath, 'utf-8');
  const fileExtension = path.extname(filePath);
  return parsers[fileExtension](date);
};
