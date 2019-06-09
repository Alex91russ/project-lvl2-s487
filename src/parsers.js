import fs from 'fs';
import path from 'path';
import yml from 'js-yaml';
import ini from 'ini';

const jsonParser = data => JSON.parse(data);
const ymlParser = date => yml.safeLoad(date);
const iniParser = date => ini.parse(date);

const parsers = {
  '.json': jsonParser,
  '.yml': ymlParser,
  '.ini': iniParser,
};

export default (filePath) => {
  const date = fs.readFileSync(filePath, 'utf-8');
  const fileExtension = path.extname(filePath);
  return parsers[fileExtension](date);
};
