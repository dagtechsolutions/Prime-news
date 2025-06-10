require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();


// MongoDB connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/prime-news';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Mock data for news articles
const articles = [
    {
        id: 1,
        title: "Nokia Transparent Mobile Announced with 250MP Camera",
        category: "Technology",
        author: "Alex Green",
        date: "June 10, 2025",
        imageUrl: "https://i.insider.com/65b2531e0a24141d65152c15?width=1200&format=jpeg",
        summary: "The concept of transparent mobile technology, once a sci-fi dream, is now stepping into reality with Nokia's latest announcement, sparking both excitement and skepticism across the globe.",
        featured: true
    },
    {
        id: 2,
        title: "Global Markets Respond to New Environmental Policies",
        category: "Business",
        author: "Jane Smith",
        date: "June 10, 2025",
        imageUrl: "https://c.files.bbci.co.uk/128E6/production/_130198757_gettyimages-1248220261-1.jpg",
        summary: "New international environmental regulations have caused a stir in the stock markets. Experts analyze the potential long-term impacts on green energy and fossil fuel industries."
    },
    {
        id: 3,
        title: "The Future of Urban Farming: Vertical Gardens in Megacities",
        category: "Environment",
        author: "Peter Jones",
        date: "June 9, 2025",
        imageUrl: "https://cdn.archdaily.net/uploads/photo/image/184561/large_MVRDV_Tainan_Market_copyright_MVRDV_3.jpg",
        summary: "As urban populations grow, vertical farming offers a sustainable solution to food scarcity. Discover how cities are adopting this green technology to build a resilient future."
    },
    {
        id: 4,
        title: "Exploring the Deep Sea: New Species Discovered",
        category: "Science",
        author: "Chen Wang",
        date: "June 8, 2025",
        imageUrl: "https://i.natgeofe.com/n/a0201504-c36b-48d6-b184-c5a75225e01b/long-jaw-loose-jaw-dragonfish-3x2.jpg",
        summary: "A recent deep-sea expedition has uncovered several new species, highlighting the vast biodiversity hidden in the ocean's depths and the importance of conservation efforts."
    },
    {
        id: 5,
        title: "AI in Healthcare: Revolutionizing Patient Diagnostics",
        category: "Health",
        author: "Maria Garcia",
        date: "June 7, 2025",
        imageUrl: "https://www.einfochips.com/blog/wp-content/uploads/2019/07/how-ai-is-revolutionizing-the-healthcare-industry-featured.jpg",
        summary: "Artificial intelligence is no longer just a buzzword in healthcare. New AI models are helping doctors diagnose diseases earlier and more accurately than ever before."
    }
];


// API endpoint to get articles
app.get('/api/articles', (req, res) => {
    res.json(articles);
});

// Serve the main index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//app.listen(PORT, () => {
    //console.log(`Prime News server running at http://localhost:${PORT}`);
//});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Prime News running on port ${PORT}`);
});
