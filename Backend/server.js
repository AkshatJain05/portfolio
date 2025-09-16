// server.js

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";

dotenv.config();

// Routes
import authRoutes from "./Routes/auth.js";
import projectRoutes from "./Routes/projects.js";
import contactRoutes from "./Routes/contact.js";

// Connect to MongoDB
connectDB();

const app = express();

// ================== Middleware ==================
app.use(
  cors({
    origin: [
      "https://akshat-portfoliopro.vercel.app",
      "http://localhost:5173",
      "https://portfolio-akshat.onrender.com/"
    ], //  allow only your frontend URLs
    credentials: true, // allow cookies
  })
);

app.use(cookieParser());
app.use(express.json()); //  parse JSON requests

// ================== Routes ==================
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);

// Default route
app.get("/", (_req, res) => {
  res.send("Portfolio backend is running ");
});

// ================== Start server ==================
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(` Server running on port ${PORT}`)
);
