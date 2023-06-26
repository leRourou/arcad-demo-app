import axios from 'axios';
import { Article } from '../classes/models/article';
import api from './api.json';
import { createInformations } from './articleInfomationsServices';

export async function getAllArticles(nb, search, page) {
    return axios.get(api.endpoint + api.items.article + `?nb=${nb}&search=${search}&page=${page}`)
        .then(response => response.data.articles.map(article => new Article(
            article.ID,
            article.DESCRIPTION,
            article.SALE_PRICE,
            article.WHOLESALE_PRICE,
            article.FAMILLY_ID,
            article.STOCK,
            article.MINIMUM_QUANTITY,
            article.CUSTOMER_QUANTITY,
            article.PURCHASE_QUANTTITY,
            article.VAT_ID,
            article.CREATION_DATE,
            article.LAST_MODIFICATION,
            article.LAST_MODIFIER_ID
        )))
}

export async function getArticleById(id) {
    return axios.get(api.endpoint + api.items.article + id)
        .then(response => { return response.data.article }).then(article =>
            new Article(
                article.ID,
                article.DESCRIPTION,
                article.SALE_PRICE,
                article.WHOLESALE_PRICE,
                article.FAMILLY_ID,
                article.STOCK,
                article.MINIMUM_QUANTITY,
                article.CUSTOMER_QUANTITY,
                article.PURCHASE_QUANTTITY,
                article.VAT_ID,
                article.CREATION_DATE,
                article.LAST_MODIFICATION,
                article.LAST_MODIFIER_ID
            ));
}

export async function updateArticle(article) {
    try {
        article.last_update = new Date().toISOString()
        const newArticle = Article.toAPIFormat(article);
        const response = await axios.put(api.endpoint + api.items.article, newArticle)
        if (response.status === 204) {
            return true;
        }
    } catch (error) {
        return false;
    }
}

export async function createArticle(article, description) {
    try {
        const MAX_ID = await getMaxID();
        article.id = (parseInt(MAX_ID) + 1).toString();
        article.last_update = new Date().toISOString()
        const newArticle = Article.toAPIFormat(article);
        const response = await axios.post(api.endpoint + api.items.article, newArticle);
        createInformations(article.id, description);
        if (response.status === 201 || response.status === 200) {
            return true;
        }
    } catch (error) {
        return false;
    }
}

export async function createArticleProvider(articleId, providerId) {
    let objToCreate = {}
    objToCreate.PROVIDER_ID = providerId;
    objToCreate.ARTICLE_ID = articleId;
    try {
        const response = await axios.post(api.endpoint + api.items.article_provider, objToCreate);
        if (response.status === 201 || response.status === 200) {
            return true;
        }
    } catch (error) {
        return false;
    }
}

export async function deleteArticleProvider(articleId, providerId) {
    try {
        const response = await axios.delete(api.endpoint + api.items.article_provider + `${articleId}/${providerId}`);
        if (response.status === 204) {
            return true;
        }
    } catch (error) {
        return false;
    }
}


export function deleteArticle(id) {
    axios.delete(api.endpoint + api.items.article + id)
    return axios.delete(api.endpoint + api.items.article + id)
}

export function getArticlesByProviders(providerID) {
    return axios.get(api.endpoint + api.items.provider + `${providerID}`)
        .then(response => response.data.providers)
}

export function getMaxID() {
    return axios.get(api.endpoint + api.items.article + `max`)
        .then(response => response.data.max)
}

export function getLengthArticles() {
    return axios.get(api.endpoint + api.items.article + `length`)
        .then(response => response.data.length)
}