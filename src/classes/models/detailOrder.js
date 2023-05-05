/**
 * Represents a detail of an order.
 * @class
 * @category Models
 * @property {number} id - The detail order ID.
 * @property {number} year - The detail order year.
 * @property {number} line - The detail order line.
 * @property {number} articleId - The detail order article ID.
 * @property {number} quantity - The detail order quantity.
 * @property {number} quantityLivred - The detail order quantity livred.
 * @property {number} price - The detail order price.
 * 
 * @description - This class is used to represent a detail of an order.
 */

export class DetailOrder {

    /**
     * @constructor
     * @param {Object} detailOrder
     * @description - This constructor is used to create a detail order object.
     */
    constructor(detailOrder) {
        this.id = detailOrder.ODORID;
        this.year = detailOrder.ODYEAR;
        this.line = detailOrder.ODLINE;
        this.articleId = detailOrder.ODARID;
        this.quantity = detailOrder.ODQTY;
        this.quantityLivred = detailOrder.ODQTYLIV; // ?
        this.price = detailOrder.ODPRICE;
        this.total = detailOrder.ODTOT;
        this.totalVat = detailOrder.ODTOTVAT // ???
    }

    /**
     * @method
     * @param {DetailOrder} detailOrder - A detail order object to convert.
     * @returns {Object} - The detail order data in the format required by the API.
     * @description - This method is used to convert a detail order object into the format required by the API.
     */
    static reverse(detailOrder) {
        return {
            ODORID: detailOrder.id,
            ODYEAR: detailOrder.year,
            ODLINE: detailOrder.line,
            ODARID: detailOrder.articleId,
            ODQTY: detailOrder.quantity,
            ODQTYLIV: detailOrder.quantityLivred,
            ODPRICE: detailOrder.price,
            ODTOT: detailOrder.total,
            ODTOTVAT: detailOrder.totalVat,
        }
    }

}