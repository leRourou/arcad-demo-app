export class OrderLine {

    constructor(id, year, line, articleId, quantity, quantityLivred, price, total, totalVat) {
        this.id = id;
        this.year = year;
        this.line = line;
        this.articleId = articleId;
        this.quantity = quantity;
        this.quantityLivred = quantityLivred;
        this.price = price;
        this.total = total;
        this.totalVat = totalVat;
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