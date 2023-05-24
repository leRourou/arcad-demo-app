/**
 * Represents a country.
 * @class
 * @category Models
 * @property {number} id - The country ID.
 * @property {string} name - The country name.
 * @property {string} iso_code - The country ISO code.
 * 
 * @description - This class is used to represent a country.
 */

export class Country {
    /**
     * @constructor
     * @param {Object} country - The country data as an object just like it is in the database.
     */
    constructor(country) {
        this.id = country.ID;
        this.name = country.NAME;
        this.iso_code = country.ISO_CODE;
    }

    static get columns() {
        return [
            { name: "id", type: "number", displayName: "ID", display: true },
            { name: "name", type: "string", displayName: "Name", display: true },
            { name: "iso_code", type: "string", displayName: "ISO Code", display: true }
        ]
    }

    static empty() {
        return {
            id: 0,
            name: "",
            iso_code: ""
        }
    }

    static getErrors(country) {
        const errors = [];
        if (!country.name) {
            errors.push("The name is required.");
        }
        if (!country.iso_code) {
            errors.push("The ISO code is required.");
        }
        if (country.iso_code.length !== 3) {
            errors.push("The ISO code must be 3 characters long.");
        }
        return errors;
    }


    /**
     * @method
     * @param {Country} article - A country object to convert.
     * @returns {Object} - The country data in the format required by the API.
     * @description - This method is used to convert a country object into the format required by the API.
     */
    static toAPIFormat(country) {
        return {
            ID: country.id,
            NAME: country.name,
            ISO_CODE: country.iso_code
        }
    }
}