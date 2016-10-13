'use strict';

const fs = require('fs');

const filename = process.argv[2] || '';
// by passing a blank string we'll get the following error: { [Error: ENOENT: no such file or directory, open ''] errno: -2, code: 'ENOENT', syscall: 'open', path: '' }
const readFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename,(error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
  });
});

};

const logMessage = (data) => {
    console.log(`${filename} is ${data.length} bytes long`); // <-- this is a template literal
  };

readFile(filename)
.then(logMessage)
.catch(console.error)
;
