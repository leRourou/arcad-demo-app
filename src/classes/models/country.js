/**
 * Represents a country.
 * @class
 * @category Models
 * @property {number} id - The country ID.
 * @property {string} name - The country name.
 * @property {string} codeISO - The country ISO code.
 * 
 * @description - This class is used to represent a country.
 */

export class Country {
    /**
     * @constructor
     * @param {Object} country - The country data as an object just like it is in the database.
     */
    constructor(country) {
        this.id = country.COID;
        this.name = country.COUNTR;
        this.codeISO = country.COISO;
    }

    /**
     * @method
     * @param {Country} article - A country object to convert.
     * @returns {Object} - The country data in the format required by the API.
     * @description - This method is used to convert a country object into the format required by the API.
     */
    static reverse(country) {
        return {
            COID: country.id,
            COUNTR: country.name,
            COISO: country.codeISO,
        }
    }
}