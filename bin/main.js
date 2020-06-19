#!/usr/bin/env node

'use strict';

const argv = require('minimist')(process.argv.slice(2));

const mkdirp = require('mkdirp');
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const TEMPLATES = path.join(__dirname, '..', 'templates');

const write = (file, str) => writeFileSync(file, str);

const copyTemplate = (from, to) => {
  write(to, readFileSync(path.join(TEMPLATES, from), 'utf-8'));
};

function create(dir, name) {
  if (!name) name = dir;
  let pkg = {
    name: name,
    version: '0.0.0',
    scripts: {
      postinstall: 'node fail.js',
    },
  };

  if (dir !== '.') {
    mkdirp.sync(path.join(dir, '.'));
  }

  copyTemplate('fail.js', path.join(dir, 'fail.js'));
  copyTemplate('README.md', path.join(dir, 'README.md'));
  copyTemplate('gitignore', path.join(dir, '.gitignore'));

  write(path.join(dir, 'package.json'), JSON.stringify(pkg, null, 2));
}

const params = argv._;
if (params.length === 0 || params[0] === '') {
  console.log('\nUsage: npx falta appDir\n');
  console.log('or');
  console.log('\nUsage: npx falta appDir appName\n');
  process.exit(1);
} else {
  create(params[0], params[1]);
}