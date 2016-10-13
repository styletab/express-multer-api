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

// upload is returning an object from parseFile and defining a dictionary to send down the promise chain
const upload = (file) => {
  const options = {
    // get the bucket name from the AWS S3 console
    Bucket: 'ktabbucket',
    // attache the fileBuffer as a stream to send to Amazon
    Body: file.data,
    // allow anyone to access the URL of the uploaded file
    ACL: 'public-read',
    // tell S3 what the mime=type is
    ContentType: file.mime,
    // pick a filename for S3 to use for the upload
    Key: `test/test.${file.ext}`
  };
  // not actually uploaded yet just pass the data down the Promise chain
  return Promise.resolve(options);
};

const logMessage = (upload) => {
  // get rid of the stream for now so I can log the rest of my options in the terminal with out seeing the stream
  delete upload.Body;
  // turn the pojo into a string so I can see the options
    console.log(`the upload options are ${JSON.stringify(upload)}`); // <-- this is a template literal
  };

readFile(filename)
.then(parseFile)
.then(upload)
.then(logMessage)
.catch(console.error)
;
