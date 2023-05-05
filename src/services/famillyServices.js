import axios from 'axios';
import store from '../store';
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
export function getAllFamilies() {
    return axios.get(api_endpoint + "?nb=10000")
        .then(response => response.data.families.map(familly => new Familly(familly)))
        .then(families => store.dispatch({ type: 'LOAD_CUSTOMERS', payload: { data: families } }))
}

/**
 * @function
 * @description - Get a familly by its ID.
 * @param {number} id 
 * @returns {Promise<Familly>}
 */
export function getFamillyById(id) {
    return axios.get(api_endpoint + id)
        .then(response => response.data);
}

/**
 * @function
 * @description - Update a familly in the API.
 * @param {Familly} familly 
 * @returns {Promise<number>} - The HTTP status code of the response. 
 */

export async function updateFamilly(familly) {
    const newFamilly = Familly.reverse(familly);
    try {
        const response = axios.put(api_endpoint, newFamilly, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        });
        
        store.dispatch({ type: 'UPDATE_FAMILLY', payload: { customer: newFamilly } });
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

    familly.id = generateNextId(store.getState().families.map(familly => familly.id));
    const newFamilly = Familly.reverse(familly);
    try {
        const response = await axios.post(api_endpoint, newFamilly, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        });
        
        store.dispatch({ type: 'ADD_CUSTOMER', payload: { customer: new Familly(newFamilly) } });
        
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
        .then(response => response.data);
}

/**
 * @function
 * @description - Generate the next ID for a familly.
 * @param {Array<string>} familyIds - An array of families IDs.
 * @returns {string} - The next ID for a familly.
 */
function generateNextId(familyIds) {
    let highestId = 0;
    
    // Find the highest ID in the array
    for (let i = 0; i < familyIds.length; i++) {
      let currentId = parseInt(familyIds[i], 10);
      
      if (currentId > highestId) {
        highestId = currentId;
      }
    }
    
    // Increment the highest ID by one and format it as a six-digit string
    let nextId = (highestId + 1).toString().padStart(6, '0');
    
    return nextId;
  }