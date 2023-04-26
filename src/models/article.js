// Column definitions
export const columns = [
    { id: 1, name: "description", type: "string", displayName: "Article", display: true },
    { id: 2, name: "sold_price", type: "price", displayName: "Price", display: true },
    { id: 3, name: "wholesale_price", type: "price", displayName: "Wholesale price", display: false },
    { id: 4, name: "family", type: "string", displayName: "Family", display: false },
    { id: 5, name: "stock", type: "number", displayName: "Stock", display: true },
    { id: 6, name: "quantity_min", type: "number", displayName: "Min. quantity", display: true },
    { id: 7, name: "quantity_ordered", type: "number", displayName: "Ordered quantity", display: false },
    { id: 8, name: "quantity_provided", type: "number", displayName: "Provided quantity", display: false },
    { id: 9, name: "tax_id", type: "string", displayName: "Tax ID", display: false },
    { id: 10, name: "creation_date", type: "date", displayName: "Creation date", display: false },
    { id: 11, name: "last_update", type: "date", displayName: "Last update", display: false },
];

// Article Model
export function createArticleModel(article) {
    return {
        id: article.ARID,
        description: article.ARDESC,
        sold_price: article.ARSALEPR,
        wholesale_price: article.ARWHSPR,
        family: article.ARTIFA,
        stock: article.ARSTOCK,
        quantity_min: article.ARMINQTY,
        quantity_ordered: article.ARCUSQTY,
        quantity_provided: article.ARPURQTY,
        tax_id: article.ARVATCD,
        creation_date: article.ARCREA,
        last_update: article.ARMOD
    }
}

// Reverse Article Model
export function reverseArticleModel(article) {
    return {
        ARID: article.id,
        ARVATCD: article.tax_id,
        ARDESC: article.description,
        ARSALEPR: article.sold_price,
        ARWHSPR: article.wholesale_price,
        ARTIFA: article.family,
        ARSTOCK: article.stock,
        ARMINQTY: article.quantity_min,
        ARCUSQTY: article.quantity_ordered,
        ARPURQTY: article.quantity_provided,
        ARCREA: article.creation_date,
        ARMOD: article.last_update,
    }
}