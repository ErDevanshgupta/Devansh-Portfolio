const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },  // markdown
  coverImage: { type: String, default: '' },
  tags: [{ type: String }],
  readTime: { type: Number, default: 5 },
  status: { type: String, enum: ['published', 'draft'], default: 'draft' },
  publishedAt: { type: Date }
}, { timestamps: true });

// Auto-calculate read time before saving
blogSchema.pre('save', function (next) {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  this.readTime = Math.ceil(wordCount / wordsPerMinute);
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
