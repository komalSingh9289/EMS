import express from "express";
import LeadSource from "../models/lead-model.js";

const router = express.Router();

router.post("/addLead", async (req, res) => {
  try {
    const { title} = req.body;

    // Check if Lead already exists
    const existingLead = await LeadSource.findOne({ title });
    if (existingLead) {
      return res.status(400).json({ message: "Lead already exists" });
    }

    // Create new Lead
    const newLead = new LeadSource({title});
    await newLead.save();

    res.status(201).json({ message: "Lead registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/", async (req, res) => {
    try {
      const leads = await LeadSource.find(); // Fetch all leads
      res.status(200).json(leads); // Respond with the leads array
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

export default router
