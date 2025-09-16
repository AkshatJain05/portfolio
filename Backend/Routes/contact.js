// routes/contactRoutes.js

import express from "express";
import Contact from "../Models/ContactModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ==================== Add contact message - public ====================
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contact = new Contact({
      name,
      email,
      message,
    });
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==================== Get all contacts - admin only ====================
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
