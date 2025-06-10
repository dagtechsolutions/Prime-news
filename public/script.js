document.addEventListener('DOMContentLoaded', () => {
    fetchArticles();
});

async function fetchArticles() {
    try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const articles = await response.json();
        displayArticles(articles);
    } catch (error) {
        console.error("Could not fetch articles:", error);
        // Display an error message to the user
        const articlesGrid = document.getElementById('articles-grid');
        articlesGrid.innerHTML = '<p>Sorry, we couldn\'t load the news right now. Please try again later.</p>';
    }
}

function displayArticles(articles) {
    const featuredArticleContainer = document.getElementById('featured-article');
    const articlesGrid = document.getElementById('articles-grid');
    const moreStoriesList = document.getElementById('more-stories-list');

    // Clear existing content
    featuredArticleContainer.innerHTML = '';
    articlesGrid.innerHTML = '';
    moreStoriesList.innerHTML = '';

    const featuredArticle = articles.find(article => article.featured);
    const regularArticles = articles.filter(article => !article.featured);

    // Display Featured Article
    if (featuredArticle) {
        const articleCard = createArticleCard(featuredArticle, true);
        featuredArticleContainer.appendChild(articleCard);
    }
    
    // Display other articles in the grid
    regularArticles.forEach(article => {
        const articleCard = createArticleCard(article, false);
        articlesGrid.appendChild(articleCard);
    });

    // Populate sidebar
    articles.forEach(article => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="#article-${article.id}">${article.title}</a>`;
        moreStoriesList.appendChild(listItem);
    });
}

function createArticleCard(article, isFeatured) {
    const card = document.createElement('article');
    card.className = 'article-card';
    card.id = `article-${article.id}`;
    
    const imageHtml = `<img src="${article.imageUrl}" alt="${article.title}">`;
    
    const contentHtml = `
        <div class="article-content">
            <span class="category">${article.category}</span>
            <h2>${article.title}</h2>
            <p class="meta">By ${article.author} | ${article.date}</p>
            <p>${article.summary}</p>
        </div>
    `;
    
    card.innerHTML = imageHtml + contentHtml;
    
    return card;
}
