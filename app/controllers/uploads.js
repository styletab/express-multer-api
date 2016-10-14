'use strict';

const controller = require('lib/wiring/controller');
// needs multer middleware
const multer = require('app/middleware/multer');
const models = require('app/models');
const Upload = models.upload;

// const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  Upload.find()
    .then(uploads => res.json({ uploads }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Upload.findById(req.params.id)
    .then(upload => upload ? res.json({ upload }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  // let upload = Object.assign(req.body.upload, {
  //   _owner: req.currentUser._id,
  // });
  let upload = {
    file: req.file, // see documentation for this under multer upload

    comment: req.body.upload.comment,
  };

  res.json({ upload });
  // Upload.create(upload)
  //   .then(upload => res.json({ upload }))
  //   .catch(err => next(err));
};

// const update = (req, res, next) => {
//   let search = { _id: req.params.id, _owner: req.currentUser._id };
//   Upload.findOne(search)
//     .then(upload => {
//       if (!upload) {
//         return next();
//       }
//
//       delete req.body._owner;  // disallow owner reassignment.
//       return example.update(req.body.example)
//         .then(() => res.sendStatus(200));
//     })
//     .catch(err => next(err));
// };

// const destroy = (req, res, next) => {
//   let search = { _id: req.params.id, _owner: req.currentUser._id };
//   Example.findOne(search)
//     .then(example => {
//       if (!example) {
//         return next();
//       }
//
//       return example.remove()
//         .then(() => res.sendStatus(200));
//     })
//     .catch(err => next(err));
// };

module.exports = controller({
  index,
  show,
  create,
  // update,
  // destroy,
}, { before: [
  // { method: authenticate, except: ['index', 'show'] },
  {method: multer.single('upload[file]'), only: ['create']},
], });
