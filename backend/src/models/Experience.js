const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  type: { type: String, enum: ['Industry', 'Research', 'Freelance'], required: true },
  techStack: [{ type: String }],
  keyImpact: { type: String, default: '' },
  points: [{ type: String }],
  clients: [{ type: String }], // For freelance
  ctaUrl: { type: String, default: '' },
  ctaLabel: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
