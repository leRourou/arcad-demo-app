/**
 * Represents a provider.
 * @class
 * @category Models
 * @property {number} id - The provider ID.
 * @property {string} name - The provider name.
 * @property {string} contact - The provider contact.
 * @property {string} phone - The provider phone number.
 * @property {string} vat_id - The provider {@link VAT} id.
 * @property {string} email - The provider mail.
 * @property {string} address - The provider address line 1.
 * @property {string} address2 - The provider address line 2.
 * @property {string} address3 - The provider address line 3.
 * @property {string} zipCode - The provider zip code.
 * @property {string} city - The provider city.
 * @property {string} country_id - The provider {@link Country} id.
 * @property {Date} creation_date - The provider creation date.
 * @property {TimeStamp} last_update - The provider last update date.
 * @property {number} last_modifier_id - The provider last updater id.
 * @property {Date} deleted - Set at 1 if the customer is deleted..
 */
export class Provider {
    /**
     * @constructor
     * @param {Object} provider 
     * @description - This constructor is used to create a provider object.
     */
    constructor(provider) {
        this.id = provider.ID;
        this.name = provider.NAME;
        this.contact = provider.CONTACT;
        this.phone = provider.PHONE;
        this.vat_id = provider.VAT_ID;
        this.mail = provider.EMAIL;
        this.address = provider.ADDRESS_LINE_1;
        this.address2 = provider.ADDRESS_LINE_2;
        this.address3 = provider.ADDRESS_LINE_3;
        this.zipCode = provider.ZIPCODE;
        this.city = provider.CITY;
        this.country_id = provider.COUNTRY_ID;
        this.creation_date = provider.CREATION_DATE;
        this.last_update = provider.LAST_MODIFICATION;
        this.last_modifier_id = provider.LAST_MODIFIER_ID;
        this.delete_date = provider.DELETED;
    }

      /**
   * @method
   * @description Gives the columns of the article for the DataTable component.
   * @returns {Array<{name, type, displayName, display}>} - The columns of the article.
   */
  static get columns() {
    return [
        { name: "id", type: "number", displayName: "ID", display: true },
        { name: "name", type: "string", displayName: "Nom", display: true },
        { name: "contact", type: "string", displayName: "Contact", display: false },
        { name: "phone", type: "string", displayName: "Phone", display: false },
        { name: "vat_id", type: "string", displayName: "VAT ID", display: false },
        { name: "mail", type: "string", displayName: "Mail", display: false },
        { name: "address", type: "string", displayName: "Address", display: false },
        { name: "address2", type: "string", displayName: "Address 2", display: false },
        { name: "address3", type: "string", displayName: "Address 3", display: false },
        { name: "zipCode", type: "string", displayName: "Zip Code", display: false },
        { name: "city", type: "string", displayName: "City", display: true },
        { name: "country_id", type: "string", displayName: "Country ID", display: false },
        { name: "creation_date", type: "date", displayName: "Creation Date", display: false },
        { name: "last_update", type: "date", displayName: "Last Update", display: false },
        { name: "last_modifier_id", type: "number", displayName: "Last Modifier ID", display: false },
        { name: "deleted", type: "number", displayName: "Deleted ?", display: false }
    ];
  }

    /**
     * @method
     * @param {Provider} provider - A provider object to convert.
     * @returns {Object} - The provider data in the format required by the API.
     * @description - This method is used to convert a provider object into the format required by the API.
     */
    static toAPIformat(provider) {
        return {
            ID : provider.id,
            NAME : provider.name,
            CONTACT : provider.contact,
            PHONE : provider.phone,
            VAT_ID : provider.vat_id,
            EMAIL : provider.mail,
            ADDRESS_LINE_1 : provider.address,
            ADDRESS_LINE_2 : provider.address2,
            ADDRESS_LINE_3 : provider.address3,
            ZIPCODE : provider.zipCode,
            CITY : provider.city,
            COUNTRY_ID : provider.country_id,
            CREATION_DATE : provider.creation_date,
            LAST_MODIFICATION : provider.last_update,
            LAST_MODIFIER_ID : provider.last_modifier_id,
            DELETED : provider.delete_date,
        }
    }
}