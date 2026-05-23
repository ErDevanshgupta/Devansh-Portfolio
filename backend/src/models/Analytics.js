const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  path: { type: String, required: true },
  date: { type: String, required: true },  // "YYYY-MM-DD"
  views: { type: Number, default: 1 }
});

// Compound unique index on path + date
analyticsSchema.index({ path: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Analytics', analyticsSchema);
