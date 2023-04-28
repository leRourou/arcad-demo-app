export class Article {

  constructor(article) {
    this.id = article.ARID;
    this.description = article.ARDESC;
    this.sold_price = article.ARSALEPR;
    this.wholesale_price = article.ARWHSPR;
    this.family = article.ARTIFA;
    this.stock = article.ARSTOCK;
    this.quantity_min = article.ARMINQTY;
    this.quantity_ordered = article.ARCUSQTY;
    this.quantity_provided = article.ARPURQTY;
    this.tax_id = article.ARVATCD;
    this.creation_date = article.ARCREA;
    this.last_update = article.ARMOD;
  }

  static get columns() {
    return [
      { id: 1, name: "description", type: "string", displayName: "Article", display: true },
      { id: 2, name: "sold_price", type: "price", displayName: "Price", display: true },
      { id: 3, name: "wholesale_price", type: "price", displayName: "Wholesale price", display: true },
      { id: 4, name: "family", type: "string", displayName: "Family", display: false },
      { id: 5, name: "stock", type: "number", displayName: "Stock", display: true },
      { id: 6, name: "quantity_min", type: "number", displayName: "Min. quantity", display: true },
      { id: 7, name: "quantity_ordered", type: "number", displayName: "Ordered quantity", display: false },
      { id: 8, name: "quantity_provided", type: "number", displayName: "Provided quantity", display: false },
      { id: 9, name: "tax_id", type: "string", displayName: "Tax ID", display: false },
      { id: 10, name: "creation_date", type: "date", displayName: "Creation date", display: false },
      { id: 11, name: "last_update", type: "date", displayName: "Last update", display: false },
    ];
  }

  static reverse(article) {
    return {
      ARID: article.id,
      ARVATCD: article.tax_id,
      ARDESC: article.description,
      ARSALEPR: parseFloat(article.sold_price),
      ARWHSPR: parseFloat(article.wholesale_price),
      ARTIFA: article.family,
      ARSTOCK: parseInt(article.stock),
      ARMINQTY: parseInt(article.quantity_min),
      ARCUSQTY: article.quantity_ordered ? parseInt(article.quantity_ordered) : 0,
      ARPURQTY: parseInt(article.quantity_provided),
      ARCREA: article.creation_date,
      ARMOD: article.last_update,
    };
  }

  static reducer(state = [], action) {
    switch (action.type) {
      case 'LOAD_ARTICLES':
        return action.payload.data

      case 'ADD_ARTICLE':
        return [...state, action.payload.article]

      case 'UPDATE_ARTICLE':
        return state.map((item) => {
          if (item.id === action.payload.article.ARID) {
            return new Article(action.payload.article)
          }
          return item
        })

      case 'DELETE_ARTICLE':
        return state.filter((item) => item.id !== action.payload.id)

      default:
        return state
    }
  }

  static getErrors(article) {
    const errors = [];
    const { description, sold_price, wholesale_price, stock, quantity_min, quantity_provided } = article;

    // Description
    if (description === "" || description === null) {
      errors.push("Description can't be empty");
    }

    if (description.length > 50) {
      errors.push("Description can't be longer than 50 characters");
    }

    // Sold price
    if (sold_price === "") {
      errors.push("Sold price can't be empty");
    }

    if (sold_price < 0) {
      errors.push("Sold price can't be negative");
    }

    if (sold_price >= 100000) {
      errors.push("Sold price can't be higher than 99 999.99€");
    }

    if (isNaN(sold_price)) {
      errors.push("Sold price must be a number");
    }

    // Wholesale price
    if (wholesale_price === "") {
      errors.push("Wholesale price can't be empty");
    }

    if (wholesale_price < 0) {
      errors.push("Wholesale price can't be negative");
    }

    if (wholesale_price >= 100000) {
      errors.push("Wholesale price can't be higher than 99 999.99€");
    }

    if (isNaN(wholesale_price)) {
      errors.push("Wholesale price must be a number");
    }

    // Stock
    if (stock === "") {
      errors.push("Stock can't be empty");
    }

    if (stock < 0) {
      errors.push("Stock can't be negative");
    }

    if (stock >= 10000) {
      errors.push("Stock can't be higher than 9 999");
    }

    if (isNaN(stock)) {
      errors.push("Stock must be a number");
    }

    // Quantity min
    if (quantity_min === "") {
      errors.push("Quantity min can't be empty");
    }

    if (quantity_min < 0) {
      errors.push("Quantity min can't be negative");
    }

    if (quantity_min >= 10000) {
      errors.push("Quantity min can't be higher than 9 999");
    }

    if (isNaN(quantity_min)) {
      errors.push("Quantity min must be a number");
    }

    // Quantity provided
    if (quantity_provided === "") {
      errors.push("Quantity provided can't be empty");
    }

    if (quantity_provided < 0) {
      errors.push("Quantity provided can't be negative");
    }

    if (quantity_provided >= 10000) {
      errors.push("Quantity provided can't be higher than 9 999");
    }

    if (isNaN(quantity_provided)) {
      errors.push("Quantity provided must be a number");
    }

    return errors;
  }
}          
