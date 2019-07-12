// eslint-disable-next-line lodash-fp/use-fp
import _ from 'lodash';

const propertyActions = [
  {
    type: 'parent',
    check: (oldDate, newDate, key) => oldDate[key] instanceof Object
      && newDate[key] instanceof Object,
    process: (oldDate, newDate, key, func) => ({
      name: key,
      status: 'parent',
      value: func(oldDate[key], newDate[key]),
    }),
  },
  {
    type: 'added',
    check: (oldDate, newDate, key) => !_.has(oldDate, key),
    process: (oldDate, newDate, key) => ({
      name: key,
      status: 'added',
      newValue: newDate[key],
    }),
  },
  {
    type: 'deleted',
    check: (oldDate, newDate, key) => !_.has(newDate, key),
    process: (oldDate, newDate, key) => ({
      name: key,
      status: 'deleted',
      oldValue: oldDate[key],
    }),
  },
  {
    type: 'changed',
    check: (oldDate, newDate, key) => oldDate[key] !== newDate[key],
    process: (oldDate, newDate, key) => ({
      name: key,
      status: 'changed',
      oldValue: oldDate[key],
      newValue: newDate[key],
    }),
  },
  {
    type: 'unchanged',
    check: (oldDate, newDate, key) => oldDate[key] === newDate[key],
    process: (oldDate, newDate, key) => ({
      name: key,
      status: 'unchanged',
      value: oldDate[key],
    }),
  },
];

const getPropertyAction = (oldDate, newDate, key) => propertyActions
  .find(({ check }) => check(oldDate, newDate, key));

const makeAst = (oldDate, newDate) => {
  const [oldDateKeys, newDateKeys] = [Object.keys(oldDate), Object.keys(newDate)];
  const allKeys = oldDateKeys.concat(newDateKeys);
  const uniqKeys = _.uniq(allKeys);
  return uniqKeys.map((key) => {
    const node = getPropertyAction(oldDate, newDate, key);
    return node.process(oldDate, newDate, key, makeAst);
  });
};

export default makeAst;
