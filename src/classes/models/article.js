export class Article {

  constructor(id, description, sold_price, wholesale_price, familly_id, stock, quantity_min, 
    quantity_ordered, quantity_provided, tax_id, creation_date, last_update, last_modifier) {
    this.id = id;
    this.description = description;
    this.sold_price = sold_price;
    this.wholesale_price = wholesale_price;
    this.familly_id = familly_id;
    this.stock = stock;
    this.quantity_min = quantity_min;
    this.quantity_ordered = quantity_ordered;
    this.quantity_provided = quantity_provided;
    this.tax_id = tax_id;
    this.creation_date = creation_date;
    this.last_update = last_update;
    this.last_modifier = last_modifier;
  }

  static getEmptyArticle() {
    return new Article(0, "", 0, 0, 0, 0, 0, 0, 0, 0, "", "", "", false);
  }
  
  static getColumns() {
    return [
      { name: "id", type: "number", displayName: "ID", display: true },
      { name: "description", type: "string", displayName: "Articles", display: true },
      { name: "complete_description", type: "string", displayName: "Complete description", display: false },
      { name: "sold_price", type: "price", displayName: "Price", display: true },
      { name: "wholesale_price", type: "price", displayName: "Wholesale price", display: true },
      { name: "familly_id", type: "string", displayName: "Family", display: false },
      { name: "stock", type: "number", displayName: "Stock", display: true },
      { name: "quantity_min", type: "number", displayName: "Min. quantity", display: false },
      { name: "quantity_ordered", type: "number", displayName: "Ordered quantity", display: false },
      { name: "quantity_provided", type: "number", displayName: "Provided quantity", display: false },
      { name: "tax_id", type: "string", displayName: "Tax ID", display: false },
      { name: "creation_date", type: "date", displayName: "Creation date", display: false },
      { name: "last_update", type: "date", displayName: "Last update", display: true }
    ];
  }

  static toAPIFormat(article) {
    return {
      ID: article.id,
      DESCRIPTION: article.description,
      SALE_PRICE: article.sold_price,
      WHOLESALE_PRICE: article.wholesale_price,
      FAMILLY_ID: article.familly_id,
      STOCK: article.stock,
      MINIMUM_QUANTITY: article.quantity_min,
      CUSTOMER_QUANTITY: article.quantity_ordered,
      PURCHASE_QUANTITY: article.quantity_provided,
      VAT_ID: article.tax_id,
      CREATION_DATE: article.creation_date,
      LAST_MODIFICATION: article.last_update,
      LAST_MODIFIER_ID: article.last_modifier,
    }
  }
  
  static getErrors(article) {
    const errors = [];
    const { description, sold_price, wholesale_price, stock, quantity_min } = article;

    // Description
    if (description === "" || description === null) {
      errors.push("Description can't be empty");
    } else if (description.length > 50) {
      errors.push("Description can't be longer than 50 characters");
    }

    // Sold price
    if (sold_price === "") {
      errors.push("Sold price can't be empty");
    } else if (sold_price < 0) {
      errors.push("Sold price can't be negative");
    } else if (sold_price >= 100000) {
      errors.push("Sold price can't be higher than 99 999.99€");
    } else if (isNaN(sold_price)) {
      errors.push("Sold price must be a number");
    }

    // Wholesale price
    if (wholesale_price === "") {
      errors.push("Wholesale price can't be empty");
    } else if (wholesale_price < 0) {
      errors.push("Wholesale price can't be negative");
    } else if (wholesale_price >= 100000) {
      errors.push("Wholesale price can't be higher than 99 999.99€");
    } else if (isNaN(wholesale_price)) {
      errors.push("Wholesale price must be a number");
    }

    // Stock
    if (stock === "") {
      errors.push("Stock can't be empty");
    } else if (stock < 0) {
      errors.push("Stock can't be negative");
    } else if (stock >= 10000) {
      errors.push("Stock can't be higher than 9 999");
    } else if (isNaN(stock)) {
      errors.push("Stock must be a number");
    }

    // Quantity min
    if (quantity_min === "") {
      errors.push("Quantity min can't be empty");
    } else if (quantity_min < 0) {
      errors.push("Quantity min can't be negative");
    } else if (quantity_min >= 10000) {
      errors.push("Quantity min can't be higher than 9 999");
    } else if (isNaN(quantity_min)) {
      errors.push("Quantity min must be a number");
    }

    return errors;
  }
}          
