'use strict';

const multer = require('multer');
const storage = multer.memoryStorage(); // don't do this with real apps bc your memory will get eaten up really quick an no one will be able to use ur site



module.exports = multer({ storage });
