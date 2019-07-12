#!/usr/bin/env node

import program from 'commander';
import { version, description } from '../../package.json';
import genDiff from '..';

program
  .version(version)
  .description(description)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format <type>', 'output format', 'tree')
  .action((firstConfig, secondConfig) => {
    const result = genDiff(firstConfig, secondConfig, program.format);
    console.log(result);
  })
  .parse(process.argv);
