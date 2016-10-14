'use strict';

// this is the mongoose model to be used with our upload module 

const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  }
}, {
    timestamps: true,
});


uploadSchema.virtual('length').get(function (){
  return this.text.length;
});

// this is how mongoose does relathionships
const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
