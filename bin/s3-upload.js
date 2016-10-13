#!/usr/bin/env node

'use strict';

const fs = require('fs');

const filename = process.argv[2] || '';
// by passing a blank string we'll get the following error: { [Error: ENOENT: no such file or directory, open ''] errno: -2, code: 'ENOENT', syscall: 'open', path: '' }

fs.readFile(filename,(error, data) => {
  if (error) {
    return console.error(error);
  }
  console.log(`${filename} is ${data.length} bytes long`); // <-- this is a template literal
});