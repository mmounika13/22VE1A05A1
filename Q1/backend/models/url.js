const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    default: null,
  }
}, { timestamps: true });

module.exports = mongoose.model('Url', urlSchema);
