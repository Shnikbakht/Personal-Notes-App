const mongoose = require('mongoose');

// const noteSchema = new mongoose.Schema({
//   _id: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
//   text: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   lastModifiedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });


const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  lastModifiedAt: {
    type: Date,
    required: true,
  },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
