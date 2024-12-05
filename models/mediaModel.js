const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  learnMoreUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Media", mediaSchema);