const nodemailer = require('nodemailer');
const path = require('path');

// Create a transporter using SMTP service (Gmail in this case)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to handle career form submission
exports.submitCareerForm = (req, res) => {
    const { name, email, message } = req.body;

    // Check if files are uploaded, else default to null
    const resume = req.files["resume"] 
        ? path.resolve(req.files["resume"][0].path) 
        : null;
    const coverLetter = req.files["coverLetter"] 
        ? path.resolve(req.files["coverLetter"][0].path) 
        : null;

    // Define email options
    const mailOptions = {
        from: email,
        to: "info@tst.com.sa", // Replace with the desired recipient email
        subject: "New Career Application",
        html: `
            <html>
                <body>
                    <h1>New Career Application</h1>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong> ${message}</p>
                    <div id="google_translate_element"></div>
                    <script type="text/javascript">
                        function googleTranslateElementInit() {
                            new google.translate.TranslateElement({
                                pageLanguage: 'en',
                                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                                includedLanguages: 'en,ur,ar,es,fr,de'
                            }, 'google_translate_element');
                        }
                    </script>
                </body>
            </html>
        `,
        attachments: [
            resume && { path: resume },        // Attach resume if provided
            coverLetter && { path: coverLetter } // Attach cover letter if provided
        ].filter(Boolean) // Filter out null values
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ message: "Failed to send email", error: error.message });
        }

        // Send success response to the client
        console.log("Email sent:", info.response);
        res.json({ message: "Application submitted successfully!" });
    });
};