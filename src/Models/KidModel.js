const mongoose = require('mongoose');

const kidSchema = new mongoose.Schema(
  {
    Location: {
      type: String,
    },
    FullNames: {
      type: String,
    },
    dascription: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },  
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

const Kid = mongoose.model('Kid', kidSchema);

module.exports = Kid;
