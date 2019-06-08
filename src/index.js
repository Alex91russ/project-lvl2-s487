import _ from 'lodash';
import fs from 'fs';

const parseFile = filePath => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const genDiff = (firstPath, secondPath, type) => {
  const [firstDate, secondDate] = [parseFile(firstPath), parseFile(secondPath)];
  const [firstDateKeys, secondDateKeys] = [Object.keys(firstDate), Object.keys(secondDate)];
  const allKeys = firstDateKeys.concat(secondDateKeys);
  const uniqKeys = _.uniq(allKeys);

  const foundDiff = uniqKeys.reduce((acc, key) => {
    const [hasFirstKey, hasSecondKey] = [_.has(firstDate, key), _.has(secondDate, key)];
    const [firstValue, secondValue] = [firstDate[key], secondDate[key]];
    if (hasFirstKey && hasSecondKey) {
      if (firstValue === secondValue) {
        acc = [...acc, `    ${key}: ${firstValue}`];
      } else {
        acc = [...acc, `  + ${key}: ${secondValue}`, `  - ${key}: ${firstValue}`];
      }
    } else {
      acc = hasSecondKey ? [...acc, `  + ${key}: ${secondValue}`] : [...acc, `  - ${key}: ${firstValue}`];
    }
    return acc;
  }, []);

  return `{\n${foundDiff.join('\n')}\n}`;
};
export default genDiff;
