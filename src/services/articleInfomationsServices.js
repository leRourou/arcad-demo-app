import axios from 'axios';
import { ArticleInformations } from '../classes/models/articleInformations';
import api from './api.json';

export function createInformations(articleId, description) {
    let descriptionToCreate = ArticleInformations.toAPIFormat(new ArticleInformations(articleId, description));
    try {
        const response = axios.post(api.endpoint + api.items.article_description, descriptionToCreate);
        return response;
    } catch (error) {
            return error.response.status;
    }
}

export function getInformations(id) {
    return axios.get(api.endpoint + api.items.article_description + `${id}`)
        .then(response => response.data.ArticleDesc)
}

export function updateInformations(articleId, description) { 
    let descriptionToUpdate = ArticleInformations.toAPIFormat(new ArticleInformations(articleId, description));
    try {
        const response = axios.put(api.endpoint + api.items.article_description, descriptionToUpdate);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.status;
        } else {
            return error;
        }
    }
}

export function deleteInformations(id) {
    try {
        const response = axios.delete(api.endpoint + api.items.article_description + `${id}`);
        return response;
    } catch (error) {
        return error.response.status;
    }
}