import axios from 'axios';
import store from '../store';
import { Article } from '../models/article';

const api_endpoint = 'http://10.5.6.28:10010/web/services/articles/';

// Get All Articles and store them in the store
export function getAllArticles() {
    return axios.get(api_endpoint + "?nb=10000")
        .then(response => response.data.articles.map(article => new Article(article)))
        .then(articles => store.dispatch({ type: 'LOAD_ARTICLES', payload: { data: articles } }))
}

// Get Article By Id
export function getArticleById(id) {
    return axios.get(api_endpoint + id)
        .then(response => response.data);
}

// Update Article
export async function updateArticle(article) {
    article.last_update = new Date().toISOString()
    const newArticle = Article.reverse(article);
    try {
        const response = axios.put(api_endpoint, newArticle, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        });
        
        store.dispatch({ type: 'UPDATE_ARTICLE', payload: { article: newArticle } });
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.status;
        } else {
            return error;
        }
    }
}

// Create Article
export async function createArticle(article) {
    article.family = "511"
    article.tax_id = 2

    article.id = generateNextId(store.getState().articles.map(article => article.id));
    const newArticle = Article.reverse(article);
    try {
        const response = await axios.post(api_endpoint, newArticle, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        });
        
        store.dispatch({ type: 'ADD_ARTICLE', payload: { article: new Article(newArticle) } });
        
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.status;
        } else {
            return error;
        }
    }
}


// Delete Article
export function deleteArticle(id) {
    return axios.delete(api_endpoint + id)
        .then(response => response.data);
}

function generateNextId(articleIds) {
    let highestId = 0;
    
    // Find the highest ID in the array
    for (let i = 0; i < articleIds.length; i++) {
      let currentId = parseInt(articleIds[i], 10);
      
      if (currentId > highestId) {
        highestId = currentId;
      }
    }
    
    // Increment the highest ID by one and format it as a six-digit string
    let nextId = (highestId + 1).toString().padStart(6, '0');
    
    return nextId;
  }