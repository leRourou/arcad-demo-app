import axios from 'axios';
import { Provider } from '../classes/models/provider';
import api from './api.json';

/**
 * @description - This file contains the services related to the providers.
 * @fileoverview - This file contains the services related to the providers.
 * @category Services
 * @module providerServices
 * @requires axios
 * @requires Provider
 */

/**
 * @type {string}
 * @description - The API endpoint.
 * @constant
 */
const api_endpoint = api.endpoint + 'providers/';

/**
 * @function
 * @description - Get all providers from the API.
 * @returns {Promise<Array<Provider>>} - A promise that contains an array of providers.
 */
export function getAllProviders(nb, search, page ) {
    return axios.get(api_endpoint + `?nb=${nb}&search=${search}&page=${page}`)
        .then(response => response.data.providers.map(provider => new Provider(provider)))
}

/**
 * @function
 * @description - Get a provider by its ID.
 * @param {number} id 
 * @returns {Promise<Provider>}
 */
export function getProviderById(id) {
    return axios.get(api_endpoint + id)
        .then(response => new Provider(response.data.provider));
}

/**
 * @function
 * @description - Update a provider in the API.
 * @param {Provider} provider 
 * @returns {Promise<number>} - The HTTP status code of the response. 
 */
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

/**
 * @function
 * @description - Create a provider in the API.
 * @param {Provider} provider 
 * @returns {Promise<number>} - The HTTP status code of the response. 
 */
export async function createProvider(provider) {
    const maxId = await getMaxID();
    provider.id = (parseInt(maxId) + 1).toString();
    provider.last_update = new Date().toISOString()
    const newProvider = Provider.toAPIFormat(provider);
    try {
        const response = await axios.post(api_endpoint, newProvider);
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
 * @description - Delete a provider in the API.
 * @param {number} id 
 * @returns {Promise<number>} - The HTTP status code of the response.
 */
export function deleteProvider(id) {
    return axios.delete(api_endpoint + id)
        .then(response => response.data);
}

// TODO : documentation
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


// TODO : documentation
export function getMaxID() {
    return axios.get(api_endpoint + `max`)
        .then(response => response.data.max)
}

// TODO : documentation
export function getLengthProviders() {
    return axios.get(api_endpoint + `length`)
        .then(response => response.data.length)
}