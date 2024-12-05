const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const subscriberRoutes = require("./routes/subscriberRoutes");
const mediaRoutes = require("./routes/mediaRoute");
const contactRoutes = require("./routes/contactRoutes");
const careerRoutes = require("./routes/careerRoutes");
const fs = require("fs");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

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

// Static file serving
const staticDir = path.join(__dirname, ".."); // Go one level up to the project root
app.use(express.static(staticDir)); // Serve static files

// Custom route to serve HTML files without extension
app.get("/*", (req, res) => {
  const requestedPath = req.params[0]; // Get the entire path after the root `/`
  let filePath;

  // Check for a matching file in the root, projects, or car-trade folder
  if (requestedPath.includes("projects")) {
    filePath = path.join(staticDir, requestedPath + ".html"); // Serve from 'projects'
  } else if (requestedPath.includes("car-trade")) {
    filePath = path.join(staticDir, requestedPath + ".html"); // Serve from 'car-trade'
  } else {
    filePath = path.join(staticDir, requestedPath + ".html"); // Default to root directory
  }

  // Serve the file if it exists
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error serving ${filePath}:`, err.message);
      res.status(404).send("Page not found");
    }
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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