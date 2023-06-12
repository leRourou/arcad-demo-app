import axios from 'axios';
import { Article } from '../classes/models/article';
import api from './api.json';

const api_endpoint = api.endpoint + 'articles/';

export function getAllArticles(nb, search, page ) {
    return axios.get(api_endpoint + `?nb=${nb}&search=${search}&page=${page}`)
        .then(response => response.data.articles.map(article => new Article(article)))
}

export function getArticleById(id) {
    return axios.get(api_endpoint + id)
        .then(response => new Article(response.data.article));
}

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

export function getDescription(id) {
    return axios.get(api.endpoint + `artdesc/${id}`)
        .then(response => response.data.ArticleDesc)
}

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

export function deleteArticle(id) {
    axios.delete(api.endpoint + 'artdesc/' + id)
    return axios.delete(api_endpoint + id)
}

export function getArticlesByProviders(providerID) {
    return axios.get(api_endpoint + `provider/${providerID}`)
        .then(response => response.data.providers)
}

export function getMaxID() {
    return axios.get(api_endpoint + `max`)
        .then(response => response.data.max)
}

export function getLengthArticles() {
    return axios.get(api_endpoint + `length`)
        .then(response => response.data.length)
}