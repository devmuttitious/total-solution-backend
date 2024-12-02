const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const mediaController = require("../controllers/mediaController");

// Route to create a media item with image upload
router.post("/media", upload.single("image"), mediaController.createMedia);

// Route to get all media items
router.get("/media", mediaController.getAllMedia);

// Route to delete a media item by ID
router.delete("/media/:id", mediaController.deleteMedia);

router.get("/media/:id", mediaController.getMediaById);

module.exports = router;