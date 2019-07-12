const calculateTabs = depth => '  '.repeat(depth);

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

const renderTree = (ast, depth = 0) => {
  const tree = ast.reduce((acc, node) => {
    const { status } = node;
    const method = renderMethods[status];
    return `${acc}\n${method(node, depth, renderTree)}`;
  }, '');
  return `{${tree}\n${calculateTabs(depth)}}`;
};

export default renderTree;
