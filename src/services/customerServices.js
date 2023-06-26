import axios from 'axios';
import { Customer } from '../classes/models/customer';
import api from './api.json';


export function getAllCustomers(nb, search, page) {
    return axios.get(api.endpoint + api.items.customer + `?nb=${nb}&search=${search}&page=${page}`)
        .then(response => response.data.customers.map(customer => new Customer(
            customer.ID,
            customer.NAME,
            customer.PHONE,
            customer.VAT_ID,
            customer.EMAIL,
            customer.ADDRESS_LINE_1,
            customer.ADDRESS_LINE_2,
            customer.ADDRESS_LINE_3,
            customer.CITY,
            customer.ZIP_CODE,
            customer.COUNTRY_ID,
            customer.CREDIT_LIMIT,
            customer.CREDIT,
            customer.LAST_ORDER,
            customer.CREATION_DATE,
            customer.LAST_UPDATE,
            customer.LAST_MODIFIER_ID,
            customer.DELETED
        )))
}

export function getCustomerById(id) {
    return axios.get(api.endpoint + api.items.customer + id)
        .then(response => {return response.data.customer}).then(customer =>
            new Customer(
            customer.ID,
            customer.NAME,
            customer.PHONE,
            customer.VAT_ID,
            customer.EMAIL,
            customer.ADDRESS_LINE_1,
            customer.ADDRESS_LINE_2,
            customer.ADDRESS_LINE_3,
            customer.CITY,
            customer.ZIP_CODE,
            customer.COUNTRY_ID,
            customer.CREDIT_LIMIT,
            customer.CREDIT,
            customer.LAST_ORDER,
            customer.CREATION_DATE,
            customer.LAST_UPDATE,
            customer.LAST_MODIFIER_ID,
            customer.DELETED
        ));
}

export async function updateCustomer(customer) {
    const newCustomer = Customer.toAPIFormat(customer);
    try {
        const response = axios.put(api.endpoint + api.items.customer, newCustomer, {
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
    customer.id = await getMaxID() + 1;
    const newCustomer = Customer.toAPIFormat(customer);
    try {
        const response = await axios.post(api.endpoint + api.items.customer, newCustomer, {
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
    return axios.delete(api.endpoint + api.items.customer + id)
        .then(response => response.data);
}

export function getMaxID() {
    return axios.get(api.endpoint + api.items.customer + `max`)
        .then(response => response.data.max)
}

export function getLengthCustomers() {
    return axios.get(api.endpoint + api.items.customer + `length`)
        .then(response => response.data.length)
}