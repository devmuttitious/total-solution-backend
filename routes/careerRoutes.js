const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer'); // Import multer middleware
const careerController = require('../controllers/careerController');


// Upload multiple files with the names 'resume' and 'coverLetter'
router.post('/submit', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'coverLetter', maxCount: 1 }]), careerController.submitCareerForm);

module.exports = router;