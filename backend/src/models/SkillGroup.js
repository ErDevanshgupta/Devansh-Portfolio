const mongoose = require('mongoose');

const skillGroupSchema = new mongoose.Schema({
  category: { type: String, required: true },
  skills: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('SkillGroup', skillGroupSchema);
