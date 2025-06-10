// In-memory store for articles
// In a real app, this would be a database (MongoDB, PostgreSQL, etc.)
let articles = [
    {
        id: 1,
        title: "Global Summit Addresses Climate Change",
        category: "International",
        slug: "global-summit-addresses-climate-change",
        author: "Jane Doe",
        date: "2024-05-28",
        image: "https://via.placeholder.com/800x400.png?text=International+News", // Placeholder
        content: "<p>Leaders from around the world convened today to discuss urgent actions needed to combat climate change. The summit focused on renewable energy targets and international cooperation.</p><p>Key takeaways include commitments to reduce carbon emissions by 50% by 2030 and to provide financial aid to developing nations for green initiatives. Experts remain cautiously optimistic about the outcomes.</p>",
        tags: ["climate change", "summit", "international relations"]
    },
    {
        id: 2,
        title: "Tech Giants Unveil New AI Breakthroughs",
        category: "ICT Monitor",
        slug: "tech-giants-unveil-new-ai-breakthroughs",
        author: "John Smith",
        date: "2024-05-27",
        image: "https://via.placeholder.com/800x400.png?text=ICT+Monitor", // Placeholder
        content: "<p>Several leading technology companies showcased their latest advancements in artificial intelligence this week. Innovations range from more human-like language models to AI-driven diagnostic tools in healthcare.</p><p>The ICT Monitor notes that while these breakthroughs are exciting, discussions around ethical implications and job displacement are more critical than ever.</p>",
        tags: ["AI", "technology", "innovation", "ICT"]
    },
    {
        id: 3,
        title: "Local Elections See Record Turnout",
        category: "Politics",
        slug: "local-elections-see-record-turnout",
        author: "Alice Brown",
        date: "2024-05-26",
        image: "https://via.placeholder.com/800x400.png?text=Politics+News", // Placeholder
        content: "<p>This year's local elections concluded with a record number of voters casting their ballots. Analysts attribute the high turnout to increased civic engagement and several hotly contested races.</p><p>Results are expected to be finalized by the end of the week, potentially shifting the local political landscape significantly.</p>",
        tags: ["elections", "politics", "voting", "local news"]
    },
    {
        id: 4,
        title: "Maggie's Musings: The Future of Remote Work",
        category: "Maggie's Blog",
        slug: "maggies-musings-future-of-remote-work",
        author: "Maggie",
        date: "2024-05-25",
        image: "https://via.placeholder.com/800x400.png?text=Maggie's+Blog", // Placeholder
        content: "<p>Welcome to my blog! This week, I'm diving into the evolving world of remote work. Is it a fleeting trend or the new normal? I explore the pros, cons, and what companies need to do to adapt effectively.</p><p>From productivity metrics to mental well-being, the conversation around remote work is multifaceted. Join the discussion in the comments!</p>",
        tags: ["remote work", "future of work", "opinion", "blog"]
    },
    {
        id: 5,
        title: "Stock Market Hits Record High Amidst Economic Optimism",
        category: "Business",
        slug: "stock-market-hits-record-high",
        author: "Robert Green",
        date: "2024-05-29",
        image: "https://via.placeholder.com/800x400.png?text=Business+News",
        content: "<p>The stock market surged to a new record high today, fueled by positive economic indicators and investor optimism. Sectors leading the rally include technology and renewable energy.</p><p>Analysts suggest that while the outlook is bright, investors should remain cautious of potential inflationary pressures in the coming months.</p>",
        tags: ["stock market", "economy", "business", "finance"]
    }
];

let nextArticleId = articles.length + 1;

module.exports = {
    getAll: () => articles.sort((a, b) => new Date(b.date) - new Date(a.date)), // Sort by date descending
    getById: (id) => articles.find(article => article.id === parseInt(id)),
    getBySlug: (slug) => articles.find(article => article.slug === slug),
    getByCategory: (category) => articles.filter(article => article.category.toLowerCase() === category.toLowerCase()).sort((a, b) => new Date(b.date) - new Date(a.date)),
    add: (article) => {
        const newArticle = { id: nextArticleId++, ...article };
        // Simple slug generation (in real app, ensure uniqueness and better formatting)
        newArticle.slug = article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        newArticle.date = new Date().toISOString().split('T')[0]; // Set current date
        articles.push(newArticle);
        return newArticle;
    },
    update: (id, updatedArticle) => {
        const index = articles.findIndex(article => article.id === parseInt(id));
        if (index !== -1) {
            articles[index] = { ...articles[index], ...updatedArticle };
            // Re-generate slug if title changed
            if (updatedArticle.title) {
                articles[index].slug = updatedArticle.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            }
            return articles[index];
        }
        return null;
    },
    delete: (id) => {
        const index = articles.findIndex(article => article.id === parseInt(id));
        if (index !== -1) {
            articles.splice(index, 1);
            return true;
        }
        return false;
    },
    getCategories: () => { // Dynamically get categories from menu for simplicity
        return ["Business", "Politics", "Entertainment", "Opinion", "Sports", "International", "News", "Maggie's Blog", "ICT Monitor", "News and Events"];
    }
};
