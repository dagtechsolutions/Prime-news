require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/prime-news';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Mongoose schema/model for articles
const articleSchema = new mongoose.Schema({
    title: String,
    category: String,
    author: String,
    date: String,
    imageUrl: String,
    summary: String,
    featured: Boolean
});
const Article = mongoose.model('Article', articleSchema);

// API endpoint to get all articles
app.get('/api/articles', async (req, res) => {
    const articles = await Article.find().sort({ date: -1 });
    res.json(articles);
});

// API endpoint to create a new article
app.post('/api/articles', async (req, res) => {
    try {
        const newArticle = new Article(req.body);
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// API endpoint to update an article
app.put('/api/articles/:id', async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(article);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// API endpoint to delete an article
app.delete('/api/articles/:id', async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.json({ message: 'Article deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Prime News running on port ${PORT}`);
});
