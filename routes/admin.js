const express = require('express');
const router = express.Router();
const articleDb = require('../data/articles'); // Our in-memory "DB"

const menuItems = articleDb.getCategories(); // For admin forms

// Middleware for "authentication" (VERY basic, for demo only)
// In a real app, use proper authentication (sessions, JWT, password hashing)
const requireAdmin = (req, res, next) => {
    // For this demo, we'll assume admin is always "logged in"
    // To implement a login:
    // if (req.session && req.session.isAdmin) {
    //     return next();
    // }
    // res.redirect('/admin/login');
    next(); // Bypass login for this simple demo
};

// Admin Dashboard
router.get('/dashboard', requireAdmin, (req, res) => {
    res.render('admin/dashboard', {
        pageTitle: 'Dashboard',
        articles: articleDb.getAll()
    });
});

// Show form to add new article
router.get('/articles/new', requireAdmin, (req, res) => {
    res.render('admin/add-article', {
        pageTitle: 'Add New Article',
        categories: menuItems // Pass categories for the dropdown
        // article: null // To differentiate from edit
    });
});

// Handle new article submission
router.post('/articles/new', requireAdmin, (req, res) => {
    const { title, category, author, image, content, tags } = req.body;
    const newArticle = {
        title,
        category,
        author: author || "Prime News Staff",
        image: image || "https://via.placeholder.com/800x400.png?text=News", // Default placeholder
        content,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    };
    articleDb.add(newArticle);
    res.redirect('/admin/dashboard');
});

// Show form to edit an article
router.get('/articles/edit/:id', requireAdmin, (req, res, next) => {
    const article = articleDb.getById(req.params.id);
    if (article) {
        res.render('admin/add-article', { // Re-use the add-article form for editing
            pageTitle: 'Edit Article',
            article: article,
            categories: menuItems
        });
    } else {
        next(); // 404
    }
});

// Handle article update
router.put('/articles/edit/:id', requireAdmin, (req, res) => {
    const { title, category, author, image, content, tags } = req.body;
    const updatedData = {
        title,
        category,
        author: author || "Prime News Staff",
        image: image || undefined, // Keep old if not provided
        content,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    };
    // Filter out undefined fields so they don't overwrite existing data if blank in form
    Object.keys(updatedData).forEach(key => updatedData[key] === undefined && delete updatedData[key]);

    articleDb.update(req.params.id, updatedData);
    res.redirect('/admin/dashboard');
});

// Handle article deletion
router.delete('/articles/delete/:id', requireAdmin, (req, res) => {
    articleDb.delete(req.params.id);
    res.redirect('/admin/dashboard');
});


module.exports = router;