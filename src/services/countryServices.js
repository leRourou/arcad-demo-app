import axios from 'axios';
import { Country } from '../classes/models/country';
import api from './api.json';

/**
 * @description - This file contains the services related to the countries.
 * @fileoverview - This file contains the services related to the countries.
 * @category Services
 * @module countryServices
 * @requires axios
 * @requires Country
 */


const api_endpoint = api.endpoint + 'countries/';

/**
 * @function
 * @description - Get all countries from the API.
 * @returns {Promise<Array<Country>>} - A promise that contains an array of countries.
 */
export function getAllCountries(nb, search, page ) {
    return axios.get(api_endpoint + `?nb=${nb}&search=${search}&page=${page}`)
        .then(response => response.data.countries.map(country => new Country(country)))
}

/**
 * @function
 * @description - Get a country by its ID.
 * @param {number} id 
 * @returns {Promise<Country>}
 */
export function getCountryById(id) {
    return axios.get(api_endpoint + id)
        .then(response => new Country(response.data.country));
}

/**
 * @function
 * @description - Update a country in the API.
 * @param {Country} country 
 * @returns {Promise<number>} - The HTTP status code of the response. 
 */
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

/**
 * @function
 * @description - Create an country in the API.
 * @param {Country} country 
 * @returns {Promise<number>} - The HTTP status code of the response. 
 */
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

/**
 * @function
 * @description - Delete a country in the API.
 * @param {number} id 
 * @returns {Promise<number>} - The HTTP status code of the response.
 */
export function deleteCountry(id) {
    return axios.delete(api_endpoint + id)
        .then(response => response.data);
}

// TODO : documentation
export function getLengthCountries() {
    return axios.get(api_endpoint + `length`)
        .then(response => response.data.length)
}

