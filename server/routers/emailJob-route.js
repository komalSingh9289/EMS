import EmailJob from "../models/emailJob-model.js";
import User from "../models/user-model.js";
import Email from "../models/email-model.js";
import agenda from "../utils/agenda.js";

import express from "express";
import LeadSource from "../models/lead-model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, emailId, delay, leadId } = req.body;
  console.log('Request Body:', req.body); // Log the request body

  try {
      // Validate if leadId exists
      const lead = await LeadSource.findById(leadId);
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }

    // Parse the delay string (e.g., "2h", "15m", "3d")
    const [value, unit] = delay.match(/(\d+)([dhm])/i).slice(1);
    const delayValue = parseInt(value, 10);

    // Convert delay to milliseconds
    const delayInMs =
      unit === "d"
        ? delayValue * 24 * 60 * 60 * 1000 // Days to milliseconds
        : unit === "h"
        ? delayValue * 60 * 60 * 1000 // Hours to milliseconds
        : delayValue * 60 * 1000; // Minutes to milliseconds

    // Calculate the scheduled time
    const scheduledTime = new Date(Date.now() + delayInMs);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch email details from the Email model using emailId
    const emailDetails = await Email.findById(emailId);
    if (!emailDetails) {
      return res.status(404).json({ error: "Email details not found" });
    }

    await agenda.schedule(scheduledTime, "send email", {
      email: emailDetails.to,
      subject: emailDetails.subject, // Subject of the email
      message: emailDetails.message, // Message to send
      userEmail: user.email,
    });

    const emailJob = new EmailJob({
      userId,
      emailId,
      leadId,
      delay,
      scheduledTime,
    });
    await emailJob.save();

    res
      .status(200)
      .json({ message: "Email scheduled successfully!", job: emailJob });
  } catch (error) {
    console.error("Error scheduling email:", error);
    res.status(500).json({ error: "Failed to schedule email" });
  }
});

router.get("/userEmails/:id", async (req, res) => {
  try {
    const { id } = req.params; 
    console.log(id);
    
    const emailJobs = await EmailJob.find({ userId: id })
      .populate("emailId", "to subject message") // Populate the fields from the Email collection
      .populate("leadId", "title"); // Populate the fields from the Lead collection

    if (!emailJobs) {
      return res.status(404).json({ message: "No email jobs found for this user" });
    }
    console.log(emailJobs);
    

    // Send the email jobs as a response
    res.json(emailJobs);
  } catch (error) {
    console.error("Error fetching email jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
