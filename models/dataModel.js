const mongoose = require('mongoose');
const validator = require('validator');

// Dataschema for Data Collection
const dataSchema = new mongoose.Schema({
  device: {
    type: String,
  },
  t: {
    type: Date,
  },
  w: {
    type: Number,
  },
  h: {
    type: String,
  },
  p1: {
    type: Number,
  },
  p25: {
    type: Number,
  },
  p10: {
    type: Number,
  },
});

// DATA MODEL
const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
