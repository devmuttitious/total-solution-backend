const { sendContactEmail } = require('../middlewares/sendEmail');

// Controller for handling contact form submissions
const contactFormController = async (req, res) => {
    const { name, email, message } = req.body;

    // Validate request data
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields (name, email, and message) are required!' });
    }

    try {
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