import parser from './parsers';
import { makeAst, renderAst } from './ast';

const genDiff = (firstPath, secondPath) => {
  const [firstDate, secondDate] = [parser(firstPath), parser(secondPath)];

  const ast = makeAst(firstDate, secondDate);
  const diff = renderAst(ast);
  return diff;
};
export default genDiff;
