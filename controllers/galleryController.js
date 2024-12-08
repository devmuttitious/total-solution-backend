const Gallery = require("../models/gallery");

exports.createGallery = async (req, res) => {
    const { title, location, date, alts } = req.body; // Extract text fields
    console.log("req.files:", req.files);
    console.log("req.body:", req.body);
  
    if (!title || !location || !date) {
      return res.status(400).json({ message: "Title, location, and date are required." });
    }
  
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images are required." });
    }
  
    try {
      const images = req.files.map((file, index) => ({
        src: file.path,
        alt: Array.isArray(alts) ? alts[index] : "", // Map alt text
      }));
  
      const newGallery = new Gallery({
        title,
        location,
        date,
        images,
      });
  
      await newGallery.save();
      res.status(201).json({
        message: "Gallery created successfully",
        gallery: newGallery,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating gallery",
        error,
      });
    }
  };
  
  

// Fetch all galleries
exports.getGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.status(200).json({ message: "Galleries retrieved successfully", galleries });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving galleries", error });
  }
};
