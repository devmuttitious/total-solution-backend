const express = require('express');
const router = express.Router();
const { contactFormController } = require('../controllers/contactController');

// Route for handling contact form submissions
router.post('/contact', contactFormController);

module.exports = router;