import makePlain from './plain';
import makeTree from './tree';

const formats = {
  tree: makeTree,
  plain: makePlain,
};

const getFormat = format => formats[format];

export default getFormat;
