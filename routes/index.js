const express = require('express');
const router = express.Router();
const articleDb = require('../data/articles'); // MongoDB-based service

const menuItems = articleDb.getCategories();

// Homepage
router.get('/', async (req, res, next) => {
  try {
    const allArticles = await articleDb.getAll();
    const featuredArticles = allArticles.slice(0, 3);
    res.render('index', {
      pageTitle: 'Home',
      articles: allArticles,
      featuredArticles: featuredArticles,
      menuItems: menuItems
    });
  } catch (err) {
    next(err);
  }
});

// Category page
router.get('/category/:categorySlug', async (req, res, next) => {
  try {
    const categorySlug = req.params.categorySlug;
    const categoryName = menuItems.find(item => item.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') === categorySlug);

    if (!categoryName) {
      return next();
    }
    const articlesInCategory = await articleDb.getByCategory(categoryName);
    res.render('category', {
      pageTitle: categoryName,
      currentCategory: categoryName,
      articlesInCategory: articlesInCategory,
      menuItems: menuItems
    });
  } catch (err) {
    next(err);
  }
});

// Single article page
router.get('/article/:slug', async (req, res, next) => {
  try {
    const article = await articleDb.getBySlug(req.params.slug);
    if (article) {
      res.render('article', {
        pageTitle: article.title,
        article: article,
        menuItems: menuItems
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;