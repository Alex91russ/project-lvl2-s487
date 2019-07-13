import getParser from './parsers';
import getFormatter from './formatters';
import makeAst from './ast';

const genDiff = (firstPath, secondPath, format = 'tree') => {
  const [oldDate, newDate] = [getParser(firstPath), getParser(secondPath)];
  const ast = makeAst(oldDate, newDate);
  const formatMethod = getFormatter(format);
  const result = formatMethod(ast);
  return result;
};
export default genDiff;
