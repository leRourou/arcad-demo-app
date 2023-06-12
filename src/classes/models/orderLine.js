export class OrderLine {

    constructor(orderLine) {
        this.id = orderLine.ORDER_ID;
        this.year = orderLine.ORDER_YEAR;
        this.line = orderLine.LINE;
        this.articleId = orderLine.ARTICLE_ID;
        this.quantity = orderLine.QUANTITY;
        this.quantityLivred = orderLine.QUANTITY_DELIVRED;
        this.price = orderLine.PRICE;
        this.total = orderLine.TOTAL;
        this.totalVat = orderLine.TOTAL_WITH_VAT;
    }

    static toAPIFormat(orderLine) {
        return {
            ORDER_ID: orderLine.id,
            ORDER_YEAR: orderLine.year,
            LINE: orderLine.line,
            ARTICLE_ID: orderLine.articleId,
            QUANTITY: orderLine.quantity,
            QUANTITY_DELIVRED: orderLine.quantityLivred,
            PRICE: orderLine.price,
            TOTAL: orderLine.total,
            TOTAL_WITH_VAT: orderLine.totalVat
        }
    }

}