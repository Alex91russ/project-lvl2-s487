// eslint-disable-next-line lodash-fp/use-fp
import _ from 'lodash';
import parser from './parsers';

const genDiff = (firstPath, secondPath) => {
  const [firstDate, secondDate] = [parser(firstPath), parser(secondPath)];
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
