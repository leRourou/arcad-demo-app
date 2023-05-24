/**
 * Represents an article.
 * @class
 * @category Models
 * @property {number} id - The article ID.
 * @property {string} description - The article description.
 * @property {number} sold_price - The price at which the article is sold.
 * @property {number} wholesale_price - The wholesale price of the article.
 * @property {string} family_id - The article {@link Family} id.
 * @property {number} stock - The current stock of the article.
 * @property {number} quantity_min - The minimum quantity of the article that can be ordered.
 * @property {number} quantity_ordered - The quantity of the article that has been ordered.
 * @property {number} quantity_provided - The quantity of the article that has been provided.
 * @property {string} tax_id - The ID of the {@link Tax} associated with the article.
 * @property {Date} creation_date - The date the article was created.
 * @property {TimeStamp} last_update - The date the article was last updated.
 */
export class Article {

  /**
   * @constructor
   * @param {Object} article - The article data as an object just like it is in the database.
   */

  constructor(article) {
    this.id = article.ID;
    this.description = article.DESCRIPTION;
    this.sold_price = article.SALE_PRICE;
    this.wholesale_price = article.WHOLESALE_PRICE;
    this.familly_id = article.FAMILLY_ID;
    this.stock = article.STOCK;
    this.quantity_min = article.MINIMUM_QUANTITY;
    this.quantity_ordered = article.CUSTOMER_QUANTITY;
    this.quantity_provided = article.PURCHASE_QUANTITY;
    this.tax_id = article.VAT_ID;
    this.creation_date = article.CREATION_DATE;
    this.last_update = article.LAST_MODIFICATION;
    this.last_modifier = article.LAST_MODIFIER_ID;
    this.deleted = article.DELETED;
  }

  // Overriding constructor to create an empty article.
  static empty() {
    return new Article({
      id : null,
      description : null,
      sold_price : null,
      wholesale_price : null,
      familly_id : null,
      stock : null,
      quantity_min : null,
      quantity_ordered : null,
      quantity_provided : null,
      tax_id : null,
      creation_date : null,
      last_update : null,
      last_modifier : null,
      deleted : null
    });
  }
  

  /**
   * @method
   * @description Gives the columns of the article for the DataTable component.
   * @returns {Array<{name, type, displayName, display}>} - The columns of the article.
   */
  static get columns() {
    return [
      { name: "id", type: "number", displayName: "ID", display: true },
      { name: "description", type: "string", displayName: "Articles", display: true },
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

  /**
   * @method
   * @param {Article} article - The article data.
   * @returns {Object} - The article data in the format required by the API.
   * @description - This method is used to convert an article object into the format required by the API.
   */

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
      DELETED: article.deleted,
    }
  }
  
  /**
   * @method 
   * @param {Article} article 
   * @returns {Array} errors - An array containing all the errors.
   */
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
