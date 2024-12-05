const Subscriber = require("../models/subscriberModel");
const { sendThankYouEmail } = require('../middlewares/sendEmail');  // Import the email sending function

const subscribeNewsletter = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required." });
    }

    try {
        // Check if the email is already subscribed
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(409).json({ message: "Email already subscribed." });
        }

        // Save the new subscriber
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        // Send a thank you email to the subscriber
        await sendThankYouEmail(email);

        // Respond with a success message
        res.status(201).json({ message: "Successfully subscribed!" });
    } catch (error) {
        console.error("Error subscribing:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = { subscribeNewsletter };