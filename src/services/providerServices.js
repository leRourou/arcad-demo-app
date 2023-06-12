import axios from 'axios';
import { Provider } from '../classes/models/provider';
import api from './api.json';

const api_endpoint = api.endpoint + 'providers/';

export function getAllProviders(nb, search, page ) {
    return axios.get(api_endpoint + `?nb=${nb}&search=${search}&page=${page}`)
        .then(response => response.data.providers.map(provider => new Provider(provider)))
}

export function getProviderById(id) {
    return axios.get(api_endpoint + id)
        .then(response => new Provider(response.data.provider));
}

export async function updateProvider(provider) {
    provider.last_update = new Date().toISOString()
    const newProvider = Provider.toAPIFormat(provider);
    try {
        const response = axios.put(api_endpoint, newProvider);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.status;
        } else {
            return error;
        }
    }
}

export function deleteProvider(id) {
    return axios.delete(api_endpoint + id)
        .then(response => response.data);
}

export function getProvidersByArticles(articleID) {
    return axios.get(api.endpoint + `artiprovs/article/${articleID}`)
        .then(response => {
            return Promise.all(response.data.artiprovs.map(provider => getProviderById(provider)));
        })
        .catch(error => {
            if (error.response && error.response.status === 404) {
                return []; // Renvoyer un tableau vide en cas d'erreur 404
            } else {
                throw error; // Renvoyer l'erreur d'origine pour les autres cas d'erreur
            }
        });
}

export function getLengthProviders() {
    return axios.get(api_endpoint + `length`)
        .then(response => response.data.length)
}