const express = require("express");
const router = express.Router();
const Contact = require("../Models/ContactModel");
const auth = require("../middleware/auth");


// Add contact message - public
router.post("/", async (req, res) => {
   const {name , email , message} = req.body;
  try {
    const contact = new Contact({
      name,
      email,
      message
    });
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all contacts - admin only
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
