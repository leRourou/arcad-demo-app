import axios from 'axios';
import store from '../store';
import { createArticleModel, reverseArticleModel } from '../models/article';

const api_endpoint = 'http://10.5.6.28:10010/web/services/articles/';

// Get All Articles and store them in the store
export function getAllArticles() {
    return axios.get(api_endpoint + "?nb=10000")
        .then(response => response.data.articles.map(article => createArticleModel(article)))
        .then(articles => store.dispatch({ type: 'LOAD_DATA', payload: { data: articles } }))
}

// Get Article By Id
export function getArticleById(id) {
    return axios.get(api_endpoint + id)
        .then(response => response.data);
}

// Update Article
export function updateArticle(article) {
    const newArticle = reverseArticleModel(article);
    axios.put(api_endpoint + article.id, newArticle, {
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }
    })
        .then(store.dispatch({ type: 'UPDATE_ARTICLE', payload: { article: newArticle } }));
}

// Create Article
export function createArticle(article) {
    // TODO : remove this line
    article.family = "511"
    article.tax_id = 2

    // get the article with the highest id
    store.getState().articles.forEach((item) => {
        if (parseInt(item.id) > parseInt(article.id)) {
            article.id = 0 + (parseInt(item.id) + 1).toString()
        }
    })
    
    const newArticle = reverseArticleModel(article);

    axios.post(api_endpoint, newArticle, {
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }
    })
        .then(store.dispatch({ type: 'ADD_ARTICLE', payload: { article: createArticleModel(newArticle) } }));
}

// Delete Article
export function deleteArticle(id) {
    return axios.delete(api_endpoint + id)
        .then(response => response.data);
}