import mongoose from 'mongoose';

const emailJobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection
    required: true,
  },
  emailId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Email', // Reference to the Email collection
    required: true,
  },
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LeadSource', // Reference to the Lead collection
    required: true,
  },
  delay: {
    type: String,
    required: true,
  },
  scheduledTime: { 
    type: Date, 
    default: () => new Date(), // Automatically sets the current timestamp
  },
});

const EmailJob = mongoose.model('EmailJob', emailJobSchema);

export default EmailJob;
