'use strict';

const { join } = require('path');
const fs = require('fs-extra');
const cwd = process.cwd();

const create = require('../lib/create');

test('Should create a blank project.', () => {
  create(['foo']);
  expect(fs.existsSync(join(cwd, 'foo'))).toBeTruthy();
  fs.removeSync(join(cwd, 'foo'));
});
