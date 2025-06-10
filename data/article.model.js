const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  author: { type: String, default: 'Prime News Staff' },
  date: { type: Date, default: Date.now },
  image: { type: String },
  content: { type: String, required: true },
  tags: [String]
});

ArticleSchema.index({ slug: 1 });

module.exports = mongoose.model('Article', ArticleSchema);