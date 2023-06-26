import axios from 'axios';
import { Provider } from '../classes/models/provider';
import api from './api.json';

export function getAllProviders(nb, search, page ) {
    return axios.get(api.endpoint + api.items.provider + `?nb=${nb}&search=${search}&page=${page}`)
        .then(response => response.data.providers.map(provider => new Provider(
            provider.ID,
            provider.NAME,
            provider.CONTACT,
            provider.PHONE,
            provider.VAT_ID,
            provider.EMAIL,
            provider.ADDRESS_LINE_1,
            provider.ADDRESS_LINE_2,
            provider.ADDRESS_LINE_3,
            provider.ZIPCODE,
            provider.CITY,
            provider.COUNTRY_ID,
            provider.CREATION_DATE,
            provider.LAST_MODIFICATION,
            provider.LAST_MODIFIER_ID,
            provider.DELETED
        )))
}

export function getProviderById(id) {
    return axios.get(api.endpoint + api.items.provider + id)
        .then(response => {return response.data.provider}).then(provider => new Provider(
            provider.ID,
            provider.NAME,
            provider.CONTACT,
            provider.PHONE,
            provider.VAT_ID,
            provider.EMAIL,
            provider.ADDRESS_LINE_1,
            provider.ADDRESS_LINE_2,
            provider.ADDRESS_LINE_3,
            provider.ZIPCODE,
            provider.CITY,
            provider.COUNTRY_ID,
            provider.CREATION_DATE,
            provider.LAST_MODIFICATION,
            provider.LAST_MODIFIER_ID,
            provider.DELETED
        ));
}

export async function updateProvider(provider) {
    provider.last_update = new Date().toISOString()
    const newProvider = Provider.toAPIFormat(provider);
    try {
        const response = axios.put(api.endpoint + api.items.provider, newProvider);
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
    return axios.delete(api.endpoint + api.items.provider + id)
        .then(response => response.data);
}

export function getProvidersByArticles(articleID) {
    return axios.get(api.endpoint + api.items.article_provider + `article/${articleID}`)
        .then(response => {
            return Promise.all(response.data.artiprovs.map(provider => getProviderById(provider)));
        })
        .catch(error => {
            if (error.response && error.response.status === 404) {
                return []; 
            } else {
                throw error;
            }
        });
}

export function getLengthProviders() {
    return axios.get(api.endpoint + api.items.provider + `length`)
        .then(response => response.data.length)
}