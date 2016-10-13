'use strict';

const fs = require('fs');
const fileType = require('file-type');

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

// return a default file type in the case that that fileType is given an unsupported filetype to read
const mimeType = (data) => {
  return Object.assign({
    ext: 'bin',
    mime: 'application/octet-stream', // this is the safest default file type for anything . it's a binary file that has info in it (bytes)
  }, fileType(data));

};

// this is going to return an object with the file and mime type
const parseFile = (fileBuffer) => {
  let file = mimeType(fileBuffer);
  file.data = fileBuffer;
  return file;
};

const logMessage = (file) => {
  //  let typeData = fileType(data); // data is the contents of filename that was passed through readFile.
    console.log(`${filename} is ${file.data.length} bytes long and is of mime ${file.mime}`); // <-- this is a template literal
  };

readFile(filename)
.then(parseFile)
.then(logMessage)
.catch(console.error)
;
