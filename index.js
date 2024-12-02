const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const subscriberRoutes = require("./routes/subscriberRoutes");
const mediaRoutes = require("./routes/mediaRoute");
const contactRoutes = require("./routes/contactRoutes");
const careerRoutes = require("./routes/careerRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

const staticDir = path.join(__dirname, ".."); // Go one level up to the project root
app.use(express.static(staticDir)); //


app.use(express.json());

// Database Connection
connectDB();

// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Social media redirection routes
app.get('/social/facebook', (req, res) => {
    res.redirect('https://web.facebook.com/tst.601?mibextid=ZbWKwL&_rdc=1&_rdr');
});

app.get('/social/twitter', (req, res) => {
    res.redirect('https://x.com/search?q=tst_601&t=hSTqqeMPt4IvJZApqT93RA&s=09');
});

app.get('/social/instagram', (req, res) => {
    res.redirect('https://www.instagram.com/tst.601/?igshid=YmMyMTA2M2Y');
});

app.get('/social/whatsapp', (req, res) => {
    res.redirect('https://api.whatsapp.com/send/?phone=966598301301&text&type=phone_number&app_absent=0');
});

app.get('/social/snapchat', (req, res) => {
    res.redirect('https://www.snapchat.com/add/tst.601');
});

// API Routes
app.use("/api", subscriberRoutes);
app.use("/api", mediaRoutes);
app.use("/api", contactRoutes);
app.use("/api/career", careerRoutes);

// Root route to show API status
app.get("/", (req, res) => {
    res.send("Your API is working");    
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
