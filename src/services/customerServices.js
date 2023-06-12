import axios from 'axios';
import { Customer } from '../classes/models/customer';
import api from './api.json';

const api_endpoint = api.endpoint + 'customers/';

export function getAllCustomers(nb, search, page ) {
    return axios.get(api_endpoint + `?nb=${nb}&search=${search}&page=${page}`)
        .then(response => response.data.customers.map(customer => new Customer(customer)))
}

export function getCustomerById(id) {
    return axios.get(api_endpoint + id)
        .then(response => new Customer(response.data.customer));
}

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

export async function createCustomer(customer) {
    const newCustomer = Customer.toAPIFormat(customer);
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

export function deleteCustomer(id) {
    return axios.delete(api_endpoint + id)
        .then(response => response.data);
}

export function getMaxID() {
    return axios.get(api_endpoint + `max`)
        .then(response => response.data.max)
}

export function getLengthCustomers() {
    return axios.get(api_endpoint + `length`)
        .then(response => response.data.length)
}