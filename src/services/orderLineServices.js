import api from './api.json';
import axios from 'axios';
import { OrderLine } from '../classes/models/orderLine';

const api_endpoint = api.endpoint + 'orderlines/';

export function getOrderLinesByOrderId(order_id) {
    return axios.get(api_endpoint + order_id)
        .then(response => response.data.orderLines.map(orderline => new OrderLine(orderline)))
}

export async function addOrderLine(order_id, article_id, quantity, price) {
    let nOrderLine = {};
    nOrderLine.id = order_id;
    nOrderLine.articleId = article_id;
    nOrderLine.quantity = quantity;
    nOrderLine.price = price;
    nOrderLine.year = new Date().getFullYear();
    let maxLine = await getMaxLine(order_id);
    nOrderLine.line = maxLine + 1;
    let nOL = OrderLine.toAPIFormat(nOrderLine);
    console.log(nOL);
    return axios.post(api_endpoint, nOL)
        .then(response => response.status)
}

export async function editOrderLine(order_id, article_id, quantity, price) {
    let nOrderLine = {};
    nOrderLine.id = order_id;
    nOrderLine.articleId = article_id;
    nOrderLine.quantity = quantity;
    nOrderLine.price = price;
    nOrderLine.year = new Date().getFullYear();
    let maxLine = await getMaxLine(order_id);
    nOrderLine.line = maxLine + 1;
    let nOL = OrderLine.toAPIFormat(nOrderLine);
    console.log(nOL);
    return axios.put(api_endpoint, nOL)
        .then(response => response.status)
}

    

export function getMaxLine(order_id) {
    return axios.get(api_endpoint + `max/${order_id}`)
        .then(response => response.data.max)
}