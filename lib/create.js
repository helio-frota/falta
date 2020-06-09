'use strict';

const { existsSync } = require('fs');
const copySync = require('fs-extra').copySync;
const { join, resolve } = require('path');

module.exports = function create(name) {
  const appRoot = resolve(name.toString());
  const template = join(__dirname, '../template');
  if (!existsSync(name)) {
    try {
      copySync(template, appRoot);
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  } else {
    console.log(`The directory ${name} already exists.`);
    process.exit(1);
  }
  console.log(`Successfully created in ${appRoot}.`);
};
