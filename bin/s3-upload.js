
// bin/s3-upload.js
'use strict';

// this has to become before anything else
// this is getting the object from the export of the .dotenv module and calling .config (which is responsible for reading the .env file and brings the those key definitions into node)


const fs = require('fs');

const upload = require('../lib/s3-upload').upload;

const filename = process.argv[2] || '';
// by passing a blank string we'll get the following error: { [Error: ENOENT: no such file or directory, open ''] errno: -2, code: 'ENOENT', syscall: 'open', path: '' }

const readFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (error, data) => {
      if (error) {
        reject(error);
      }

      resolve(data);
    });
  });
};

// turn the pojo into a string so I can see it on the console

const logMessage = (response) => {
  // turn the pojo into a string so I can see it on the console
  console.log(`the response from AWS was ${JSON.stringify(response)}`); // <-- this is a template literal
};

readFile(filename)
.then(upload)
.then(logMessage)
.catch(console.error)
;
