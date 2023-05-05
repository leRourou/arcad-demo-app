import axios from 'axios';
import store from '../store';
import { Article } from '../classes/models/article';

/**
 * @description - This file contains the services related to the articles.
 * @fileoverview - This file contains the services related to the articles.
 * @category Services
 * @module articleServices
 * @requires axios
 * @requires store
 * @requires Article
 */

/**
 * @type {string}
 * @description - The API endpoint.
 * @constant
 */
const api_endpoint = 'http://10.5.6.28:10010/web/services/articles/';

/**
 * @function
 * @description - Get all articles from the API.
 * @returns {Promise<Array<Article>>} - A promise that contains an array of articles.
 */
export function getAllArticles() {
    return axios.get(api_endpoint + "?nb=10000")
        .then(response => response.data.articles.map(article => new Article(article)))
        .then(articles => store.dispatch({ type: 'LOAD_ARTICLES', payload: { data: articles } }))
}

/**
 * @function
 * @description - Get an article by its ID.
 * @param {number} id 
 * @returns {Promise<Article>}
 */
export function getArticleById(id) {
    return axios.get(api_endpoint + id)
        .then(response => response.data);
}

/**
 * @function
 * @description - Update an article in the API.
 * @param {Article} article 
 * @returns {Promise<number>} - The HTTP status code of the response. 
 */
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

/**
 * @function
 * @description - Create an article in the API.
 * @param {Article} article 
 * @returns {Promise<number>} - The HTTP status code of the response. 
 */
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


/**
 * @function
 * @description - Delete an article in the API.
 * @param {number} id 
 * @returns {Promise<number>} - The HTTP status code of the response.
 */
export function deleteArticle(id) {
    return axios.delete(api_endpoint + id)
        .then(response => response.data);
}

/**
 * @function
 * @description - Generate the next ID for an article.
 * @param {Array<string>} articleIds - An array of article IDs.
 * @returns {string} - The next ID for an article.
 */
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