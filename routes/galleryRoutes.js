const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const { createGallery, getGallery } = require("../controllers/galleryController");


// POST: Add a new gallery
router.post("/", upload.array("images", 10), createGallery);

// GET: Retrieve all galleries
router.get("/", getGallery);

module.exports = router;
