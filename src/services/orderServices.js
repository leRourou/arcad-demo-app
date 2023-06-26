import axios from 'axios';
import { Order } from '../classes/models/order';
import api from './api.json';

export function getAllOrders(nb, page, customer_id) {
    if (customer_id === undefined) {
        return axios.get(api.endpoint + api.items.order + `?nb=${nb}&page=${page}`)
            .then(response => response.data.orders.filter(o => o.ID !== 0)
                .map(order => new Order(
                    order.ID,
                    order.YEAR,
                    order.CUSTOMER_ID,
                    order.ORDER_DATE,
                    order.DELIVERY_DATE,
                    order.CLOSING_DATE,
                )))
    }
    return axios.get(api.endpoint + api.items.order + `?nb=${nb}&customer=${customer_id}&page=${page}`)
        .then(response => response.data.orders.filter(o => o.ID !== 0)
            .map(order => new Order(
                order.ID,
                order.YEAR,
                order.CUSTOMER_ID,
                order.ORDER_DATE,
                order.DELIVERY_DATE,
                order.CLOSING_DATE,
            )))
}

export function getOrderById(id) {
    return axios.get(api.endpoint + api.items.order + id)
        .then(response => { return response.data.order }).then(order =>
            new Order(
                order.ID,
                order.YEAR,
                order.CUSTOMER_ID,
                order.ORDER_DATE,
                order.DELIVERY_DATE,
                order.CLOSING_DATE,
            ));
}

export async function updateOrder(order) {
    order.last_modification = new Date().toISOString()
    order.id = parseInt(order.id);
    const newOrder = Order.toAPIFormat(order);
    try {
        const response = axios.put(api.endpoint + api.items.order, newOrder);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.status;
        } else {
            return error;
        }
    }
}

export async function createOrder(customerId) {
    let order = new Order();
    order.customerId = customerId;
    order.date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    order.year = new Date().getFullYear();
    order.id = parseInt(await getMaxID()) + 1;
    const newOrder = Order.toAPIFormat(order);
    try {
        const response = await axios.post(api.endpoint + api.items.order, newOrder);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.status;
        } else {
            return error;
        }
    }
}

export function deleteOrder(id) {
    return axios.delete(api.endpoint + api.items.order + id)
        .then(response => response);
}

export function getMaxID() {
    return axios.get(api.endpoint + api.items.order + `max`)
        .then(response => response.data.max)
}

export function getLengthOrders() {
    return axios.get(api.endpoint + api.items.order + `length`)
        .then(response => response.data.length)
}

export function deliver(order) {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}${month}${day}`;
        order.delivery_date = parseInt(formattedDate);
        updateOrder(order);
    } catch (error) {
        return false;
    }
    return true;
}