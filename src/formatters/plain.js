const stringify = value => (value instanceof Object ? '[complex value]' : value);

const getFullPath = (path, name) => {
  if (path.length === 0) {
    return name;
  }
  return [...path, name].join('.');
};

const renderMethods = {
  added: (node, path) => {
    const { name, newValue } = node;
    const fullPath = getFullPath(path, name);
    const buildString = `Property '${fullPath}' was added with value: ${stringify(newValue)}\n`;
    return buildString;
  },
  deleted: (node, path) => {
    const { name } = node;
    const fullPath = getFullPath(path, name);
    const buildString = `Property '${fullPath}' was removed\n`;
    return buildString;
  },
  changed: (node, path) => {
    const { name, oldValue, newValue } = node;
    const fullPath = getFullPath(path, name);
    const buildString = `Property '${fullPath}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}\n`;
    return buildString;
  },
  unchanged: (node, path) => {
    const { name } = node;
    const fullPath = getFullPath(path, name);
    const buildString = `Property '${fullPath}' hasn't been changed.\n`;
    return buildString;
  },
  parent: (node, path, func) => {
    const { name, value } = node;
    const deepNodes = func(value, [...path, name]);
    return `${deepNodes}`;
  },
};

const renderPlain = (ast, path = []) => {
  const plain = ast.reduce((str, node) => {
    const { status } = node;
    const method = renderMethods[status];
    return `${str}${method(node, path, renderPlain)}`;
  }, '');
  return plain;
};

export default renderPlain;
