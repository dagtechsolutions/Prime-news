// ... existing imports and setup

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

// GET all articles (already present)
app.get('/api/articles', async (req, res) => {
    const articles = await Article.find().sort({ date: -1 });
    res.json(articles);
});

// GET single article by ID
app.get('/api/articles/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article not found' });
        res.json(article);
    } catch (err) {
        res.status(400).json({ error: 'Invalid ID' });
    }
});

// CREATE new article
app.post('/api/articles', async (req, res) => {
    try {
        const newArticle = new Article(req.body);
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// UPDATE article by ID
app.put('/api/articles/:id', async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!article) return res.status(404).json({ error: 'Article not found' });
        res.json(article);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE article by ID
app.delete('/api/articles/:id', async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article not found' });
        res.json({ message: 'Article deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ... existing static files and listen
