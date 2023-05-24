import axios from 'axios';
import { Familly } from '../classes/models/familly';

/**
 * @description - This file contains the services related to the families.
 * @fileoverview - This file contains the services related to the families.
 * @category Services
 * @module Services
 * @requires axios
 * @requires store
 * @requires Familly
 */

/**
 * @type {string}
 * @description - The API endpoint.
 * @constant
 */
const api_endpoint = 'http://10.5.6.28:10010/web/services/families/';

/**
 * @function
 * @description - Get all families from the API.
 * @returns {Promise<Array<Familly>>} - A promise that contains an array of families.
 */
export function getAllFamilies(nb, search, page ) {
    return axios.get(api_endpoint + `?nb=${nb}&search=${search}&page=${page}`)
        .then(response => response.data.families.map(familly => new Familly(familly)))
}

/**
 * @function
 * @description - Get a familly by its ID.
 * @param {number} id 
 * @returns {Promise<Familly>}
 */
export function getFamillyById(id) {
    return axios.get(api_endpoint + id)
        .then(response => new Familly(response.data.familly));
}

/**
 * @function
 * @description - Update a familly in the API.
 * @param {Familly} familly 
 * @returns {Promise<number>} - The HTTP status code of the response. 
 */

export async function updateFamilly(familly) {
    familly.last_modification = new Date().toISOString()
    familly.id = parseInt(familly.id);
    const newFamilly = Familly.toAPIFormat(familly);
    try {
        const response = axios.put(api_endpoint, newFamilly);
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
 * @description - Create a familly in the API.
 * @param {Familly} familly 
 * @returns {Promise<number>} - The HTTP status code of the response. 
 */
export async function createFamilly(familly) {
    familly.creation_date = new Date().toISOString().slice(0, 10); // Format : YYYY-MM-DD
    familly.id = parseInt(await getMaxID()) + 1;
    const newFamilly = Familly.toAPIFormat(familly);
    try {
        const response = await axios.post(api_endpoint, newFamilly);
                
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
 * @description - Delete a familly in the API.
 * @param {number} id 
 * @returns {Promise<number>} - The HTTP status code of the response.
 */
export function deleteFamilly(id) {
    return axios.delete(api_endpoint + id)
        .then(response => response);
}

// TODO : documentation
export function getMaxID() {
    return axios.get(api_endpoint + `max`)
        .then(response => response.data.max)
}

// TODO : documentation
export function getLengthFamilies() {
    return axios.get(api_endpoint + `length`)
        .then(response => response.data.length)
}