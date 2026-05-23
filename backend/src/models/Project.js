const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false });

const projectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true },
  title: { type: String, required: true },
  tagline: { type: String, required: true },
  problem: { type: String, required: true },    // markdown
  approach: { type: String, required: true },   // markdown
  techStack: [{ type: String }],
  metrics: [metricSchema],
  coverImage: { type: String, default: '' },
  images: [{ type: String }],
  githubUrl: { type: String, default: '' },
  demoUrl: { type: String, default: '' },
  paperUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['published', 'draft'], default: 'draft' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
