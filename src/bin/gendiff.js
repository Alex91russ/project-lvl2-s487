#!/usr/bin/env node
import program from 'commander';
import { version } from '../../package.json';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format <type>', 'output format')
  .action(
    (firstConfig, secondConfig, options) => console.log(firstConfig, secondConfig, options.format),
  )
  .parse(process.argv);
