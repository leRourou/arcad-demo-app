import axios from 'axios';

const api_endpoint = 'http://10.5.6.28:10010/web/services/articles/';

// Get All Articles
export function getAllArticles() {
    return axios.get(api_endpoint + "?nb=5")
        .then(response => response.data.articles);
}

// Get Article By Id
export function getArticleById(id) {
    return axios.get(api_endpoint + id)
        .then(response => response.data);
}

// Create Article
export function createArticle(article) {
    return axios.post(api_endpoint, article)
        .then(response => response.data);
}

// Update Article
export function updateArticle(article) {
    return axios.put(api_endpoint + article.id, article)
        .then(response => response.data);
}

// Delete Article
export function deleteArticle(id) {
    return axios.delete(api_endpoint + id)
        .then(response => response.data);
}