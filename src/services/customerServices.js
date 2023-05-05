import axios from 'axios';
import store from '../store';
import { Customer } from '../classes/models/customer';

/**
 * @description - This file contains the services related to the customers.
 * @fileoverview - This file contains the services related to the customers.
 * @category Services
 * @module customerServices
 * @requires axios
 * @requires store
 * @requires Customer
 */

/**
 * @type {string}
 * @description - The API endpoint.
 * @constant
 */
const api_endpoint = 'http://10.5.6.28:10010/web/services/customers/';

/**
 * @function
 * @description - Get all customers from the API.
 * @returns {Promise<Array<Customers>>} - A promise that contains an array of customers.
 */
export function getAllCustomers() {
    return axios.get(api_endpoint + "?nb=10000")
        .then(response => response.data.customers.map(customer => new Customer(customer)))
        .then(customers => store.dispatch({ type: 'LOAD_CUSTOMERS', payload: { data: customers } }))
}

/**
 * @function
 * @description - Get a customer by its ID.
 * @param {number} id 
 * @returns {Promise<Customer>}
 */
export function getCustomerById(id) {
    return axios.get(api_endpoint + id)
        .then(response => response.data);
}

/**
 * @function
 * @description - Update a customer in the API.
 * @param {Customer} customer 
 * @returns {Promise<number>} - The HTTP status code of the response. 
 */

export async function updateCustomer(customer) {
    const newCustomer = Customer.reverse(customer);
    try {
        const response = axios.put(api_endpoint, newCustomer, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        });
        
        store.dispatch({ type: 'UPDATE_CUSTOMER', payload: { customer: newCustomer } });
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

    customer.id = generateNextId(store.getState().customers.map(customer => customer.id));
    const newCustomer = Customer.reverse(customer);
    try {
        const response = await axios.post(api_endpoint, newCustomer, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        });
        
        store.dispatch({ type: 'ADD_CUSTOMER', payload: { customer: new Customer(newCustomer) } });
        
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

/**
 * @function
 * @description - Generate the next ID for a customer.
 * @param {Array<string>} customerIds - An array of customer IDs.
 * @returns {string} - The next ID for a customer.
 */
function generateNextId(customerIds) {
    let highestId = 0;
    
    // Find the highest ID in the array
    for (let i = 0; i < customerIds.length; i++) {
      let currentId = parseInt(customerIds[i], 10);
      
      if (currentId > highestId) {
        highestId = currentId;
      }
    }
    
    // Increment the highest ID by one and format it as a six-digit string
    let nextId = (highestId + 1).toString().padStart(6, '0');
    
    return nextId;
  }