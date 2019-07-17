import makePlain from './plain';
import makeTree from './tree';

const formats = {
  tree: makeTree,
  plain: makePlain,
  json: JSON.stringify,
};

const getFormat = format => formats[format];

export default getFormat;
