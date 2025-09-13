const express = require("express");
const router = express.Router();
const Contact = require("../Models/ContactModel");
const auth = require("../middleware/auth");

// --- Add contact message (Public) ---
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Get all contacts (Admin only) ---
router.get("/", auth, async (req, res) => {
  try {
    // Optional: Check if user is admin
    if (!req.user?.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const contacts = await Contact.find().sort({ createdAt: -1 }); // latest first
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
