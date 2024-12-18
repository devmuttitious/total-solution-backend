const axios = require('axios');
const { sendContactEmail } = require('../middlewares/sendEmail');

// Controller for handling contact form submissions
const contactFormController = async (req, res) => {
    const { name, email, message, recaptchaResponse } = req.body;

    // Validate request data
    if (!name || !email || !message || !recaptchaResponse) {
        return res.status(400).json({ error: 'All fields (name, email, message, and reCAPTCHA) are required!' });
    }

    try {
        // Verify reCAPTCHA with Google
        const captchaVerificationResponse = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            null,
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY, // Your reCAPTCHA secret key
                    response: recaptchaResponse
                }
            }
        );

        // Check if reCAPTCHA is valid
        if (!captchaVerificationResponse.data.success) {
            return res.status(400).json({ error: 'Failed reCAPTCHA validation. Please try again.' });
        }

        // Send contact form email
        const response = await sendContactEmail({ name, email, message });

        if (response.success) {
            return res.status(200).json({ message: 'Your message has been sent successfully!' });
        } else {
            return res.status(500).json({ error: 'Failed to send your message. Please try again later.' });
        }
    } catch (error) {
        console.error('Error in contactFormController:', error);
        return res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

module.exports = {
    contactFormController
};
