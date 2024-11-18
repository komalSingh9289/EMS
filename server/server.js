// server.js
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routers/user-route.js";
import leadRoutes from "./routers/lead-route.js";
import emailRoutes from "./routers/email-route.js";
import EmailJobRoutes from "./routers/emailJob-route.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leadSource", leadRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/emailSchedule", EmailJobRoutes);

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
