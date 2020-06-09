#!/usr/bin/env node

'use strict';

const argv = require('minimist')(process.argv.slice(2));
const create = require('../lib/create');

console.log(argv._);

const commands = argv._;

if (commands.length === 0 || commands[0] === '') {
  console.log('\nUsage: npx create-falta myapp\n');
  process.exit(1);
}

create(commands[0]);