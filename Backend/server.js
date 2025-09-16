const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./Config/db");

// Routes
const authRoutes = require("./Routes/auth");
const projectRoutes = require("./Routes/projects");
const contactRoutes = require("./Routes/contact");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5174","https://akshat-portfoliopro.vercel.app"], // exact frontend URLs
  credentials: true, // ✅ allow cookies
}));
app.use(cookieParser());
app.use(express.json()); // parse JSON

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Portfolio backend is running");
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
