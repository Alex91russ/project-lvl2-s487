#!/usr/bin/env node
import commander from 'commander';
import { version } from '../../package.json';

const program = commander;

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-h, --help', 'output usage information')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((options) => {
    console.log(options.help);
  })
  .parse(process.argv);
