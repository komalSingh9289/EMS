import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  title: { type: String, required: true }
});

const LeadSource = mongoose.model('LeadSource', leadSchema);

export default LeadSource;
