const express = require('express');
const router = express.Router();
const articleDb = require('../data/articles'); // Our in-memory "DB"

const menuItems = articleDb.getCategories();

// Homepage
router.get('/', (req, res) => {
    const allArticles = articleDb.getAll();
    // For simplicity, featured could be the latest or based on some logic
    const featuredArticles = allArticles.slice(0, 3);
    res.render('index', {
        pageTitle: 'Home',
        articles: allArticles,
        featuredArticles: featuredArticles,
        menuItems: menuItems
    });
});

// Category page
router.get('/category/:categorySlug', (req, res, next) => {
    const categorySlug = req.params.categorySlug;
    // Find category name by slug (simple mapping for this demo)
    const categoryName = menuItems.find(item => item.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') === categorySlug);

    if (!categoryName) {
        return next(); // 404
    }
    const articlesInCategory = articleDb.getByCategory(categoryName);
    res.render('category', {
        pageTitle: categoryName,
        currentCategory: categoryName,
        articlesInCategory: articlesInCategory,
        menuItems: menuItems
    });
});

// Single article page
router.get('/article/:slug', (req, res, next) => {
    const article = articleDb.getBySlug(req.params.slug);
    if (article) {
        res.render('article', {
            pageTitle: article.title,
            article: article,
            menuItems: menuItems
        });
    } else {
        next(); // 404
    }
});

module.exports = router;
