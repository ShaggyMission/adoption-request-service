const mongoose = require('mongoose');

const AdoptionRequestSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  petId: { type: String, required: true },
  message: { type: String },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  dateRequested: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

module.exports = mongoose.model('AdoptionRequest', AdoptionRequestSchema);
