const nodemailer = require("nodemailer");

// Configure your email transporter (update with your SMTP details)
const transporter = nodemailer.createTransport({
    service: "gmail", // You can use other services like SendGrid, Outlook, etc.
    auth: {
        user: process.env.EMAIL_USER, // Email address (e.g., example@gmail.com)
        pass: process.env.EMAIL_PASS, // Email password or app-specific password
    },
});

// Function to send a thank you email
const sendThankYouEmail = async (email) => {
    const mailOptions = {
        from: process.env.EMAIL_COMPANY, // Sender address
        to: email, // Receiver address
        subject: "Thank You for Subscribing to Our Newsletter!",
        html: `
            <html>
            <head>   
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        background-color: #ffffff;
                        padding: 20px;
                        margin: 20px auto;
                        max-width: 600px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #B79435;
                        text-align: center;
                    }
                    p {
                        font-size: 16px;
                        color: #000;
                        line-height: 1.6;
                    }
                    a {
                        color: #000;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 30px;
                        font-size: 12px;
                        color: #888888;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Thank You for Subscribing!</h1>
                    <p>Dear Subscriber,</p>
                    <p>We’re excited to have you on board! You’ll now be the first to receive the latest news, updates, and exclusive offers from us.</p>
                    <p>Your subscription is confirmed, and we’re thrilled to have you as part of our community.</p>
                    <p>Regards,<br> TST </p>
                </div>
            </body>
            </html>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Thank you email sent to:", email);
    } catch (error) {
        console.error("Error sending thank you email:", error);
    }
};

// Function to send a contact form email
const sendContactEmail = async ({ name, email, message }) => {
    const mailOptions = {
        from: email, // Sender address
        to: process.env.EMAIL_COMPANY, // Your email address to receive the contact form submissions
        subject: `New Contact ${name}`,
        html: `
            <html>
            <head>   
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        background-color: #ffffff;
                        padding: 20px;
                        margin: 20px auto;
                        max-width: 600px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    h2 {
                        color: #B79435;
                    }
                    p {
                        font-size: 16px;
                        color: #000;
                        line-height: 1.6;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>New Message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                </div>
            </body>
            </html>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Contact form email sent successfully!");
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending contact form email:", error);
        return { success: false, message: "Failed to send email" };
    }
};

module.exports = { sendThankYouEmail, sendContactEmail };
