export class Order {

    constructor(id, year, customerId, date, delivery_date, closing_date) {
        this.id = id;
        this.year = year;
        this.customerId = customerId;
        this.date = date;
        this.delivery_date = delivery_date;
        this.closing_date = closing_date;
    }

    static getColumns() {
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
        return new Order(0, "", "", "", "", "");
    }

    static getErrors(order) {
        const errors = [];
        const { year, customerId, date } = order;

        // Year
        if (!year) {
            errors.push("Year is required");
        }

        // Customer ID
        if (!customerId) {
            errors.push("Customer ID is required");
        }

        // Order Date
        if (!date) {
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