const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const axios = require("axios");
const connectDB = require("./config/db");
const subscriberRoutes = require("./routes/subscriberRoutes");
const mediaRoutes = require("./routes/mediaRoute");
const contactRoutes = require("./routes/contactRoutes");
const careerRoutes = require("./routes/careerRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:3000", // Development
      process.env.FRONTEND_URL, // Production URL from environment
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request
    } else {
      callback(new Error("Not allowed by CORS")); // Reject request
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

// Database Connection
connectDB();

// Middleware
app.use(express.json());  // for JSON requests
app.use(express.urlencoded({ extended: true }));  // to parse form data (including text fields)


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
const staticDir = path.join(__dirname, "..");
app.use(express.static(staticDir));

// API Routes
app.use("/api", subscriberRoutes);
app.use("/api", mediaRoutes);
app.use("/api", contactRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/gallery", galleryRoutes);

// Custom route to serve HTML files without extension
app.get("/*", (req, res) => {
  const requestedPath = req.params[0];

  if (requestedPath.startsWith("api/")) {
    return; // Let API route handlers process the request
  }

  let filePath;
  if (requestedPath.includes("projects")) {
    filePath = path.join(staticDir, requestedPath + ".html");
  } else if (requestedPath.includes("car-trade")) {
    filePath = path.join(staticDir, requestedPath + ".html");
  } else {
    filePath = path.join(staticDir, requestedPath + ".html");
  }

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error serving ${filePath}:`, err.message);
      res.status(404).send("Page not found");
    }
  });
});

// Serving uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Root route to show API status
app.get("/", (req, res) => {
  res.send("Your API is working");
});

// Start the Server
app.listen(PORT, () => {
  const env = process.env.NODE_ENV || "development";
  const host = env === "production" ? process.env.FRONTEND_URL : `http://localhost:${PORT}`;
  console.log(`Server is running at ${host}`);
});


