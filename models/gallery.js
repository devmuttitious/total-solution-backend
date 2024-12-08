const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  images: [
    {
      src: { type: String, required: true },
      alt: { type: String }
    }
  ]
});

module.exports = mongoose.model("Media Gallery", GallerySchema);
