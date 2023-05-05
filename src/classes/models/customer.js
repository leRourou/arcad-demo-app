/**
 * Represents a customer.
 * @class
 * @category Models
 * @property {number} id - The customer ID.
 * @property {string} name - The customer name.
 * @property {string} phone - The customer phone number.
 * @property {string} vat - The customer VAT number.
 * @property {string} mail - The customer mail address.
 * @property {string} address - The customer address line 1.
 * @property {string} adress2 - The customer address line 2.
 * @property {string} adress3 - The customer address line 3.
 * @property {string} city - The customer city.
 * @property {string} zipCode - The customer zip code.
 * @property {string} country - The customer country.
 * @property {number} limcre - The customer credit limit.
 * @property {number} credit - The customer credit.
 * @property {string} last_order - The customer last order date.
 * @property {Date} creation - The customer creation date.
 * @property {TimeStamp} last_update - The customer last update date.
 * @property {number} modid - The customer modid.
 */

export class Customer {

    /**
     * @constructor
     * @param {Object} customer - The customer data as an object just like it is in the database.
     * @description - This constructor is used to create a customer object from the data retrieved from the database.
     */
    constructor(customer) {
        this.id = customer.CUID;
        this.name = customer.CUSTNM;
        this.phone = customer.CUPHONE;
        this.vat = customer.CUVAT;
        this.mail = customer.CUMAIL;
        this.address = customer.CULINE1;
        this.adress2 = customer.CULINE2;
        this.adress3 = customer.CULINE3;
        this.city = customer.CUCITY;
        this.zipCode = customer.CUZIP;
        this.country = customer.CUCOUN;
        this.credit_limit = customer.CULIMCRE; // ???
        this.credit = customer.CUCREDIT;
        this.last_order = customer.CULASTOR;
        this.creation = customer.CUCREA;
        this.last_update = customer.CUMOD;
        this.modid = customer.CUMODID; // ??
        this.del = customer.CUDEL; // ??
    }

    static get columns() {
        return [
            { id: 1, name: "name", type: "string", displayName: "Name", display: true },
            { id: 2, name: "phone", type: "string", displayName: "Phone", display: true },
            { id: 3, name: "vat", type: "string", displayName: "VAT", display: false },
            { id: 4, name: "mail", type: "string", displayName: "Mail", display: true },
            { id: 5, name: "address", type: "string", displayName: "Address", display: false },
            { id: 6, name: "adress2", type: "string", displayName: "Address 2", display: false },
            { id: 7, name: "adress3", type: "string", displayName: "Address 3", display: false },
            { id: 8, name: "city", type: "string", displayName: "City", display: false },
            { id: 9, name: "zipCode", type: "string", displayName: "Zip Code", display: false },
            { id: 10, name: "country", type: "string", displayName: "Country", display: false },
            { id: 11, name: "credit_limit", type: "number", displayName: "Credit Limit", display: false },
            { id: 12, name: "credit", type: "number", displayName: "Credit", display: true },
            { id: 13, name: "last_order", type: "string", displayName: "Last Order", display: false },
            { id: 14, name: "creation", type: "date", displayName: "Creation", display: false },
            { id: 15, name: "last_update", type: "date", displayName: "Last Update", display: false },
            { id: 16, name: "modid", type: "number", displayName: "Modid", display: false },
            { id: 17, name: "del", type: "number", displayName: "Del", display: false }
        ]
    }

    /**
     * @method
     * @param {Customer} customer - The customer data.
     * @description - This method is used to convert a customer object into the format required by the API.
     * @returns {Object} - The customer data in the format required by the API.
     */
    static reverse(customer) {
        return {
            CUID: customer.id,
            CUSTNM: customer.name,
            CUPHONE: customer.phone,
            CUVAT: customer.vat,
            CUMAIL: customer.mail,
            CULINE1: customer.address,
            CULINE2: customer.adress2,
            CULINE3: customer.adress3,
            CUCITY: customer.city,
            CUZIP: customer.zipCode,
            CUCOUN: customer.country,
            CULIMCRE: customer.credit_limit,
            CUCREDIT: customer.credit,
            CULASTOR: customer.last_order,
            CUCREA: customer.creation,
            CUMOD: customer.last_update,
            CUMODID: customer.modid,
            CUDEL: customer.del,
        }
    }

    static reducer(state = [], action) {
        switch (action.type) {
            case 'LOAD_CUSTOMERS':
                return action.payload.data
    
            case 'ADD_CUSTOMER':
                return [...state, action.payload.customer]
    
            case 'UPDATE_CUSTOMER':
                return state.map((item) => {
                    if (item.id === action.payload.customer.CID) {
                        return new Customer(action.payload.customer)
                    }
                    return item
                })
    
            case 'DELETE_CUSTOMER':
                return state.filter((item) => item.id !== action.payload.id)
    
            default:
                return state
        }
    }
}
