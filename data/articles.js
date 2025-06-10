const Article = require('./article.model');

const categories = [
  "Business", "Politics", "Entertainment", "Opinion", "Sports",
  "International", "News", "Maggie's Blog", "ICT Monitor", "News and Events"
];

// Helper for slug generation
function slugify(title) {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

module.exports = {
  getAll: async () => {
    return Article.find().sort({ date: -1 });
  },
  getById: async (id) => {
    return Article.findById(id);
  },
  getBySlug: async (slug) => {
    return Article.findOne({ slug });
  },
  getByCategory: async (category) => {
    return Article.find({ category }).sort({ date: -1 });
  },
  add: async (article) => {
    // Ensure unique slug
    let slug = slugify(article.title);
    let slugExists = await Article.findOne({ slug });
    let suffix = 1;
    while (slugExists) {
      slug = `${slugify(article.title)}-${suffix++}`;
      slugExists = await Article.findOne({ slug });
    }
    article.slug = slug;
    article.date = new Date();
    const newArticle = new Article(article);
    return newArticle.save();
  },
  update: async (id, updatedArticle) => {
    if (updatedArticle.title) {
      updatedArticle.slug = slugify(updatedArticle.title);
    }
    return Article.findByIdAndUpdate(id, updatedArticle, { new: true });
  },
  delete: async (id) => {
    await Article.findByIdAndDelete(id);
    return true;
  },
  getCategories: () => categories
};