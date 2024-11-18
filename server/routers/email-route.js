import express from "express";
import email from "../models/email-model.js";

const router = express.Router();

router.post("/addEmail", async (req, res) => {
  try {
    const { to, subject, message} = req.body;

    // Check if Lead already exists
    const existingEmail = await email.findOne({ subject });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new Lead
    const newEmail = new email({to, subject, message});
    await newEmail.save();

    res.status(201).json({ message: "email registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/", async (req, res) => {
    try {
      const emails = await email.find(); // Fetch all leads
      res.status(200).json(emails); // Respond with the leads array
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

export default router
