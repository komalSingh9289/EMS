import Agenda from "agenda";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Agenda
const agenda = new Agenda({
  db: {
    address: process.env.MONGO_URI,
    collection: "EmailJob", // Collection for jobs
  },
});

// Define the job for sending an email
agenda.define("send email", async (job) => {
  const { email, subject, message, userEmail } = job.attrs.data;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: userEmail,
      to: email,
      subject: subject,
      text: message,
    });

    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
});

// Start Agenda with error handling
(async () => {
  try {
    await agenda.start();
    console.log("Agenda started successfully");
  } catch (error) {
    console.error("Failed to start Agenda:", error);
  }
})();

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully...");
  await agenda.stop();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully...");
  await agenda.stop();
  process.exit(0);
});

export default agenda;
