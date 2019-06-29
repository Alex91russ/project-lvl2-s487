// eslint-disable-next-line lodash-fp/use-fp
import _ from 'lodash';

const propertyActions = [
  {
    type: 'added',
    check: (dataOld, dataNew, key) => !_.has(dataOld, key),
    process: (dataOld, dataNew, key) => ({
      name: key,
      status: 'added',
      newValue: dataNew[key],
    }),
  },
  {
    type: 'deleted',
    check: (dataOld, dataNew, key) => !_.has(dataNew, key),
    process: (dataOld, dataNew, key) => ({
      name: key,
      status: 'deleted',
      oldValue: dataOld[key],
    }),
  },
  {
    type: 'changed',
    check: (dataOld, dataNew, key) => dataOld[key] !== dataNew[key],
    process: (dataOld, dataNew, key) => ({
      name: key,
      status: 'changed',
      oldValue: dataOld[key],
      newValue: dataNew[key],
    }),
  },
  {
    type: 'unchanged',
    check: (dataOld, dataNew, key) => dataOld[key] === dataNew[key],
    process: (dataOld, dataNew, key) => ({
      name: key,
      status: 'unchanged',
      value: dataOld[key],
    }),
  },
];

const getPropertyAction = (dataOld, dataNew, key) => propertyActions
  .find(({ check }) => check(dataOld, dataNew, key));

const buildString = (name, value, sign) => `  ${sign} ${name}: ${value}`;

export const makeAst = (dataOld, dataNew) => {
  console.log('dataOld: ', dataOld);
  console.log('dataNew: ', dataNew);
  const [firstDateKeys, secondDateKeys] = [Object.keys(dataOld), Object.keys(dataNew)];
  const allKeys = firstDateKeys.concat(secondDateKeys);
  const uniqKeys = _.uniq(allKeys);
  console.log('uniqKeys: ', uniqKeys);
  return uniqKeys.map((key) => {
    console.log('key: ', key);
    const node = getPropertyAction(dataOld, dataNew, key);
    console.log('node: ', node);
    return node.process(dataOld, dataNew, key);
  });
};

export const renderAst = (ast) => {
  const renderMethods = {
    added: (node) => {
      const { name, newValue } = node;
      const str = buildString(name, newValue, '+');
      return str;
    },
    deleted: (node) => {
      const { name, oldValue } = node;
      const str = buildString(name, oldValue, '-');
      return str;
    },
    changed: (node) => {
      const { name, oldValue, newValue } = node;
      const strNew = buildString(name, newValue, '+');
      const strOld = buildString(name, oldValue, '-');
      return `${strNew}\n${strOld}`;
    },
    unchanged: (node) => {
      const { name, value } = node;
      const str = buildString(name, value, ' ');
      return str;
    },
  };

  const tree = ast.reduce((acc, node) => {
    console.log('ast: ', ast);
    const { status } = node;
    console.log('status: ', status);
    const method = renderMethods[status];
    return `${acc}${method(node)}\n`;
  }, '');
  return `{\n${tree}}\n`;
};
