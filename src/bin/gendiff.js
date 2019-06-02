#!/usr/bin/env node
import program from 'commander';
import { version, description } from '../../package.json';

program
  .version(version)
  .description(description)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format <type>', 'output format')
  .action(
    (firstConfig, secondConfig, options) => console.log(firstConfig, secondConfig, options.format),
  )
  .parse(process.argv);
