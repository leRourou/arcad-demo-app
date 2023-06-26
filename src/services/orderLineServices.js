import api from './api.json';
import axios from 'axios';
import { OrderLine } from '../classes/models/orderLine';

export function getOrderLinesByOrderId(order_id) {
    return axios.get(api.endpoint + api.items.order_line + order_id)
        .then(response => response.data.orderLines.map(orderline => new OrderLine(
            orderline.ORDER_ID,
            orderline.ORDER_YEAR,
            orderline.LINE,
            orderline.ARTICLE_ID,
            orderline.QUANTITY,
            orderline.QUANTITY_DELIVRED,
            orderline.PRICE,
            orderline.TOTAL,
            orderline.TOTAL_WITH_VAT
        )))
}

export async function addOrderLine(order_id, article_id, quantity, price) {
    let maxLine = await getMaxLine(order_id);
    let nOrderLine = new OrderLine(order_id, new Date().getFullYear(), maxLine + 1, article_id, quantity, 0, price, 0, 0);
    return axios.post(api.endpoint + api.items.order_line, OrderLine.toAPIFormat(nOrderLine))
        .then(response => response.status)
}

export async function editOrderLine(order_id, article_id, quantity, price) {
    let nOrderLine = {};
    nOrderLine.id = order_id;
    nOrderLine.articleId = article_id;
    nOrderLine.quantity = quantity;
    nOrderLine.price = price;
    let maxLine = await getMaxLine(order_id);
    nOrderLine.line = maxLine + 1;
    let nOL = OrderLine.toAPIFormat(nOrderLine);
    console.log(nOL);
    return axios.put(api.endpoint + api.items.order_line, nOL)
        .then(response => response.status)
}

export async function deleteOrderLine(order_id, article_id) {
    return axios.delete(api.endpoint + api.items.order_line + `${article_id}/${order_id}`)
        .then(response => response.status)
}

export async function getMaxLine(order_id) {
    try {
        const response = await axios.get(api.endpoint + api.items.order_line + `max/${order_id}`);
        return response.data.max;
    } catch(error) {
        return 0;
    }
}