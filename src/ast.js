// eslint-disable-next-line lodash-fp/use-fp
import _ from 'lodash';

const calculateTabs = depth => '  '.repeat(depth);

const propertyActions = [
  {
    type: 'parent',
    check: (dataOld, dataNew, key) => dataOld[key] instanceof Object
      && dataNew[key] instanceof Object,
    process: (dataOld, dataNew, key, func) => ({
      name: key,
      status: 'parent',
      value: func(dataOld[key], dataNew[key]),
    }),
  },
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

const stringify = (value, depth) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const jsonStr = JSON.stringify(value, null, 2).replace(/"/g, '');
  const formatStr = jsonStr.split('\n').map((element, i) => {
    if (i === 0) {
      return element;
    }
    return `${calculateTabs(depth + 1)}${element}`;
  });
  return formatStr.join('\n');
};

const buildString = (name, value, sign, depth) => `${calculateTabs(depth)}${sign} ${name}: ${stringify(value, depth)}`;

export const makeAst = (dataOld, dataNew) => {
  const [firstDateKeys, secondDateKeys] = [Object.keys(dataOld), Object.keys(dataNew)];
  const allKeys = firstDateKeys.concat(secondDateKeys);
  const uniqKeys = _.uniq(allKeys);
  return uniqKeys.map((key) => {
    const node = getPropertyAction(dataOld, dataNew, key);
    return node.process(dataOld, dataNew, key, makeAst);
  });
};

export const renderAst = (ast, level = 0) => {
  const renderMethods = {
    added: (node, depth) => {
      const { name, newValue } = node;
      const str = buildString(name, newValue, '+', depth);
      return str;
    },
    deleted: (node, depth) => {
      const { name, oldValue } = node;
      const str = buildString(name, oldValue, '-', depth);
      return str;
    },
    changed: (node, depth) => {
      const { name, oldValue, newValue } = node;
      const strNew = buildString(name, newValue, '+', depth);
      const strOld = buildString(name, oldValue, '-', depth);
      return `${strNew}\n${strOld}`;
    },
    unchanged: (node, depth) => {
      const { name, value } = node;
      const str = buildString(name, value, ' ', depth);
      return str;
    },
    parent: (node, depth, func) => {
      const { name, value } = node;
      const deepNodes = func(value, depth + 1);
      return `${calculateTabs(depth)}  ${name}: ${deepNodes}`;
    },
  };

  const tree = ast.reduce((acc, node) => {
    const { status } = node;
    const method = renderMethods[status];
    return `${acc}\n${method(node, level, renderAst)}`;
  }, '');
  return `{${tree}\n${calculateTabs(level)}}`;
};
