const express = require('express');
const router = express.Router();
const articleDb = require('../data/articles');
const menuItems = articleDb.getCategories();

const requireAdmin = (req, res, next) => {
  next(); // Bypass for demo
};

// Admin Dashboard
router.get('/dashboard', requireAdmin, async (req, res, next) => {
  try {
    const articles = await articleDb.getAll();
    res.render('admin/dashboard', {
      pageTitle: 'Dashboard',
      articles: articles
    });
  } catch (err) {
    next(err);
  }
});

// Show form to add new article
router.get('/articles/new', requireAdmin, (req, res) => {
  res.render('admin/add-article', {
    pageTitle: 'Add New Article',
    categories: menuItems
  });
});

// Handle new article submission
router.post('/articles/new', requireAdmin, async (req, res, next) => {
  try {
    const { title, category, author, image, content, tags } = req.body;
    const newArticle = {
      title,
      category,
      author: author || "Prime News Staff",
      image: image || "https://via.placeholder.com/800x400.png?text=News",
      content,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    };
    await articleDb.add(newArticle);
    res.redirect('/admin/dashboard');
  } catch (err) {
    next(err);
  }
});

// Show form to edit an article
router.get('/articles/edit/:id', requireAdmin, async (req, res, next) => {
  try {
    const article = await articleDb.getById(req.params.id);
    if (article) {
      res.render('admin/add-article', {
        pageTitle: 'Edit Article',
        article: article,
        categories: menuItems
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

// Handle article update
router.post('/articles/edit/:id', requireAdmin, async (req, res, next) => {
  try {
    const { title, category, author, image, content, tags } = req.body;
    const updatedData = {
      title,
      category,
      author: author || "Prime News Staff",
      image: image || undefined,
      content,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    };
    // Remove undefined fields
    Object.keys(updatedData).forEach(key => updatedData[key] === undefined && delete updatedData[key]);
    await articleDb.update(req.params.id, updatedData);
    res.redirect('/admin/dashboard');
  } catch (err) {
    next(err);
  }
});

// Handle article deletion
router.post('/articles/delete/:id', requireAdmin, async (req, res, next) => {
  try {
    await articleDb.delete(req.params.id);
    res.redirect('/admin/dashboard');
  } catch (err) {
    next(err);
  }
});

module.exports = router;