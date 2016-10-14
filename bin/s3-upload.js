
// bin/s3-upload.js
'use strict';

// this for the command line

const fs = require('fs');

const AWSupload = require('../lib/s3-upload').upload;

const mongoose = require('../app/middleware/mongoose');
// this is for allowing express and mongoose to use native promises
const Upload = require('../app/models/upload');


const filename = process.argv[2] || '';
// by passing a blank string we'll get the following error: { [Error: ENOENT: no such file or directory, open ''] errno: -2, code: 'ENOENT', syscall: 'open', path: '' }
const comment = process.argv[3] || 'No comment';


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

// creating an upload model in mongo
const createUpload = (response) => {
  let upload = {
    location: response.Location,
    comment: comment,
  };
  // this is going to return a promise
  return Upload.create(upload);

};

// turn the pojo into a string so I can see it on the console
const logMessage = (upload) => {
  // turn the pojo into a string so I can see it on the console
  console.log(`${JSON.stringify(upload)}`); // <-- this is a template literal
};

readFile(filename)
.then(AWSupload)
.then(createUpload)
.then(logMessage)
.catch(console.error)
.then(() => mongoose.connection.close())
;
