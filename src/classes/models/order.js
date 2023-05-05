/**
 * Represents an order.
 * @class
 * @category Models
 * @property {number} id - The order ID.
 * @property {number} year - The order year.
 * @property {number} customerId - The order {@link Customer} ID.
 * @property {Date} date - The order date.
 * @property {Date} delete_date - The order delete date.
 * @property {Date} closing_date - The order closing date.
 */

export class Order {
    /**
     * @constructor
     * @param {Object} order 
     * @description - This constructor is used to create an order object.
     */
    constructor(order) {
        this.id = order.ORID;
        this.year = order.ORYEAR;
        this.customerId = order.ORCUID;
        this.date = order.ORDATE;
        this.delete_date = order.ORDELDATE;
        this.closing_date = order.ORCLODATE;
    }

    /**
     * @method
     * @param {Order} order - An order object to convert.
     * @returns {Object} - The order data in the format required by the API.
     * @description - This method is used to convert an order object into the format required by the API.
     */
    static reverse(order) {
        return {
            ORID : order.id,
            ORYEAR : order.year,
            ORCUID : order.customerId,
            ORDATE : order.date,
            ORDELDATE : order.delete_date,
            ORCLODATE : order.closing_date,
        }
    }
}


export function createOrderModel(order) {
    return {
        id : order.ORID,
        year : order.ORYEAR,
        customerId : order.ORCUID,
        date : order.ORDATE,
        delete_date : order.ORDELDATE,
        clo_date : order.ORCLODATE, // ???
    }
}

// Reverse Order Model
export function reverseOrderrModel(order) {
    return {
        ORID : order.id,
        ORYEAR : order.year,
        ORCUID : order.customerId,
        ORDATE : order.date,
        ORDELDATE : order.delete_date,
        ORCLODATE : order.clo_date,
    }
}