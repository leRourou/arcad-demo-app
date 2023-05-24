import axios from 'axios';
import { Article } from '../classes/models/article';
import api from './api.json';

/**
 * @description - This file contains the services related to the articles.
 * @fileoverview - This file contains the services related to the articles.
 * @category Services
 * @module articleServices
 * @requires axios
 * @requires Article
 */

const api_endpoint = api.endpoint + 'articles/';

/**
 * @function
 * @description - Get all articles from the API.
 * @returns {Promise<Array<Article>>} - A promise that contains an array of articles.
 */
export function getAllArticles(nb, search, page ) {
    return axios.get(api_endpoint + `?nb=${nb}&search=${search}&page=${page}`)
        .then(response => response.data.articles.map(article => new Article(article)))
}

/**
 * @function
 * @description - Get an article by its ID.
 * @param {number} id 
 * @returns {Promise<Article>}
 */
export function getArticleById(id) {
    return axios.get(api_endpoint + id)
        .then(response => new Article(response.data.article));
}

/**
 * @function
 * @description - Update an article in the API.
 * @param {Article} article 
 * @returns {Promise<number>} - The HTTP status code of the response. 
 */
export async function updateArticle(article) {
    article.last_update = new Date().toISOString()
    const newArticle = Article.toAPIFormat(article);
    try {
        const response = axios.put(api_endpoint, newArticle);
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
    article.tax_id = 2;
    const maxId = await getMaxID();
    article.id = (parseInt(maxId) + 1).toString();
    article.last_update = new Date().toISOString()
    const newArticle = Article.toAPIFormat(article);
    try {
        const response = await axios.post(api_endpoint, newArticle);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.status;
        } else {
            return error;
        }
    }
}

// TODO : documentation
export function getDescription(id) {
    return axios.get(api.endpoint + `artdesc/${id}`)
        .then(response => response.data.ArticleDesc)
}

// TODO : documentation
export function updateDescription(description) {
    try {
        const response = axios.put(api.endpoint + `artdesc`, description);
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
    axios.delete(api.endpoint + 'artdesc/' + id)
    return axios.delete(api_endpoint + id)
}

// TODO : documentation
export function getArticlesByProviders(providerID) {
    return axios.get(api_endpoint + `provider/${providerID}`)
        .then(response => response.data.providers)
}

// TODO : documentation
export function getMaxID() {
    return axios.get(api_endpoint + `max`)
        .then(response => response.data.max)
}

// TODO : documentation
export function getLengthArticles() {
    return axios.get(api_endpoint + `length`)
        .then(response => response.data.length)
}