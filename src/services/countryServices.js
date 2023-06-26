import axios from 'axios';
import { Country } from '../classes/models/country';
import api from './api.json';

export function getAllCountries(nb, search, page) {
    return axios.get(api.endpoint + api.items.country + `?nb=${nb}&search=${search}&page=${page}`)
        .then(response => response.data.countries.map(country => new Country(
            country.ID,
            country.NAME,
            country.ISO_CODE
        )))
}

export function getCountryById(id) {
    return axios.get(api.endpoint + api.items.country + id)
        .then(response => {return response.data.country }).then(country =>
            new Country(
            country.ID,
            country.NAME,
            country.ISO_CODE
        ));
}

export async function updateCountry(country) {
    country.last_update = new Date().toISOString()
    const newCountry = Country.toAPIFormat(country);
    try {
        const response = axios.put(api.endpoint + api.items.country, newCountry);
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
        const response = await axios.post(api.endpoint + api.items.country, newCountry);
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
    return axios.delete(api.endpoint + api.items.country + id)
        .then(response => response.data);
}

export function getLengthCountries() {
    return axios.get(api.endpoint + api.items.country + `length`)
        .then(response => response.data.length)
}

