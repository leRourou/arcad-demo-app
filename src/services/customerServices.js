import axios from 'axios';
import { Customer } from '../classes/models/customer';
import api from './api.json';

/**
 * @description - This file contains the services related to the customers.
 * @fileoverview - This file contains the services related to the customers.
 * @category Services
 * @module customerServices
 * @requires axios
 * @requires Customer
 */


const api_endpoint = api.endpoint + 'customers/';

/**
 * @function
 * @description - Get all customers from the API.
 * @returns {Promise<Array<Customer>>} - A promise that contains an array of customers.
 */
export function getAllCustomers(nb, search, page ) {
    return axios.get(api_endpoint + `?nb=${nb}&search=${search}&page=${page}`)
        .then(response => response.data.customers.map(customer => new Customer(customer)))
}
/**
 * @function
 * @description - Get a customer by its ID.
 * @param {number} id 
 * @returns {Promise<Customer>}
 */
export function getCustomerById(id) {
    return axios.get(api_endpoint + id)
        .then(response => new Customer(response.data.customer));
}

/**
 * @function
 * @description - Update a customer in the API.
 * @param {Customer} customer 
 * @returns {Promise<number>} - The HTTP status code of the response. 
 */

export async function updateCustomer(customer) {
    const newCustomer = Customer.toAPIFormat(customer);
    try {
        const response = axios.put(api_endpoint, newCustomer, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        });
        
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
 * @description - Create a customer in the API.
 * @param {Customer} customer 
 * @returns {Promise<number>} - The HTTP status code of the response. 
 */
export async function createCustomer(customer) {
    const newCustomer = Customer.reverse(customer);
    try {
        const response = await axios.post(api_endpoint, newCustomer, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        });
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
 * @description - Delete a customer in the API.
 * @param {number} id 
 * @returns {Promise<number>} - The HTTP status code of the response.
 */
export function deleteCustomer(id) {
    return axios.delete(api_endpoint + id)
        .then(response => response.data);
}

// TODO : documentation
export function getMaxID() {
    return axios.get(api_endpoint + `max`)
        .then(response => response.data.max)
}

// TODO : documentation
export function getLengthCustomers() {
    return axios.get(api_endpoint + `length`)
        .then(response => response.data.length)
}