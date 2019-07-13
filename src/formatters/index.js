import makePlain from './plain';
import makeTree from './tree';

const makeJson = format => JSON.stringify(format);

const formats = {
  tree: makeTree,
  plain: makePlain,
  json: makeJson,
};

const getFormat = format => formats[format];

export default getFormat;
