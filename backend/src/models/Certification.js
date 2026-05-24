const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ['Cloud', 'AI/ML', 'Programming', 'Languages', 'Cybersecurity', 'DevOps', 'Research', 'Full Stack'],
    required: true,
  },
  tags: [{
    type: String,
  }],
  issueDate: {
    type: Date,
  },
  expiryDate: {
    type: Date,
  },
  credentialId: {
    type: String,
  },
  certificateUrl: {
    type: String,
  },
  certificateImage: {
    type: String,
  },
  logo: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Completed', 'In Progress', 'Expired'],
    default: 'Completed',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  displayOrder: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model('Certification', certificationSchema);
