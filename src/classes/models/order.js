export class Order {

    constructor(order) {
        this.id = order.ID;
        this.year = order.YEAR;
        this.customerId = order.CUSTOMER_ID;
        this.date = order.ORDER_DATE;
        this.delivery_date = order.DELIVERY_DATE;
        this.closing_date = order.CLOSING_DATE;
    }

    static get columns() {
        return [
            { name: "id", type: "number", displayName: "ID", display: true },
            { name: "year", type: "number", displayName: "Year", display: true },
            { name: "customerId", type: "number", displayName: "Customer ID", display: true },
            { name: "date", type: "strDate", displayName: "Order Date", display: true },
            { name: "delivery_date", type: "strDate", displayName: "Delete Date", display: false },
            { name: "closing_date", type: "strDate", displayName: "Closing Date", display: false }
        ];
    }

    static empty() {
        return {
            id: null,
            year: null,
            customerId: null,
            date: null,
            delivery_date: null,
            closing_date: null
        }
    }

    static getErrors(order) {
        const errors = [];
        if (!order.year) {
            errors.push("Year is required");
        }

        if (!order.customerId) {
            errors.push("Customer ID is required");
        }

        if (!order.date) {
            errors.push("Order Date is required");
        }

        return errors;
    }

    static toAPIFormat(order) {
        return {
            ID: order.id,
            YEAR: order.year,
            CUSTOMER_ID: order.customerId,
            ORDER_DATE: order.date,
            DELIVERY_DATE: order.delivery_date,
            CLOSING_DATE: order.closing_date,
        }
    }
}