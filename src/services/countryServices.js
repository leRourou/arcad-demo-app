import axios from 'axios';
import { Country } from '../classes/models/country';
import api from './api.json';

const api_endpoint = api.endpoint + 'countries/';

export function getAllCountries(nb, search, page ) {
    return axios.get(api_endpoint + `?nb=${nb}&search=${search}&page=${page}`)
        .then(response => response.data.countries.map(country => new Country(country)))
}

export function getCountryById(id) {
    return axios.get(api_endpoint + id)
        .then(response => new Country(response.data.country));
}

export async function updateCountry(country) {
    country.last_update = new Date().toISOString()
    const newCountry = Country.toAPIFormat(country);
    try {
        const response = axios.put(api_endpoint, newCountry);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.status;
        } else {
            return error;
        }
    }
}

export async function createCountry(country) {
    const newCountry = Country.toAPIFormat(country);
    try {
        const response = await axios.post(api_endpoint, newCountry);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.status;
        } else {
            return error;
        }
    }
}

export function deleteCountry(id) {
    return axios.delete(api_endpoint + id)
        .then(response => response.data);
}

export function getLengthCountries() {
    return axios.get(api_endpoint + `length`)
        .then(response => response.data.length)
}

