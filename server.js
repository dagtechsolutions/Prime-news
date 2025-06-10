const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); // For PUT/DELETE from forms
const path = require('path');

const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method')); // Allows PUT/DELETE via _method query param in forms

// Routes
app.use('/', indexRoutes);
app.use('/admin', adminRoutes); // All admin routes will be prefixed with /admin

// Basic Error Handling (improve for production)
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render('error', { // You'll need an error.ejs view
        message: error.message,
        error: process.env.NODE_ENV === 'development' ? error : {},
        menuItems: require('./data/articles').getCategories(), // Pass menu items
        pageTitle: "Error"
    });
});


app.listen(PORT, () => {
    console.log(`Prime News server running on http://localhost:${PORT}`);
});