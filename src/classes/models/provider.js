/**
 * Represents a provider.
 * @class
 * @category Models
 * @property {number} id - The provider ID.
 * @property {string} name - The provider name.
 * @property {string} cont - The provider contact.
 * @property {string} phone - The provider phone.
 * @property {string} vat - The provider {@link VAT}.
 * @property {string} mail - The provider mail.
 * @property {string} address - The provider address line 1.
 * @property {string} adress2 - The provider address line 2.
 * @property {string} adress3 - The provider address line 3.
 * @property {string} zip - The provider zip code.
 * @property {string} city - The provider city.
 * @property {string} country - The provider {@link Country}.
 * @property {Date} creation_date - The provider creation date.
 * @property {TimeStamp} last_update - The provider last update date.
 * @property {number} last_updater - The provider last updater.
 * @property {Date} delete_date - The provider delete date.
 */
export class Provider {
    /**
     * @constructor
     * @param {Object} provider 
     * @description - This constructor is used to create a provider object.
     */
    constructor(provider) {
        this.id = provider.PRID;
        this.name = provider.PROVNM;
        this.cont = provider.PROVCONT;
        this.phone = provider.PRPHONE;
        this.vat = provider.PROVVAT;
        this.mail = provider.PRMAIL;
        this.address = provider.PRLINE1;
        this.adress2 = provider.PRLINE2;
        this.adress3 = provider.PRLINE3;
        this.zip = provider.PRZIP;
        this.city = provider.PRCITY;
        this.country = provider.PRCOUN;
        this.creation_date = provider.PRCREA;
        this.last_update = provider.PRMOD;
        this.last_updater = provider.PRMODID;
        this.delete_date = provider.PRDEL;
    }

    /**
     * @method
     * @param {Provider} provider - A provider object to convert.
     * @returns {Object} - The provider data in the format required by the API.
     * @description - This method is used to convert a provider object into the format required by the API.
     */
    static reverse(provider) {
        return {
            PRID: provider.id,
            PROVNM : provider.name,
            PROVCONT : provider.cont,
            PRPHONE : provider.phone,
            PROVVAT : provider.vat,
            PRMAIL : provider.mail,
            PRLINE1 : provider.address,
            PRLINE2 : provider.adress2,
            PRLINE3 : provider.adress3,
            PRZIP : provider.zip,
            PRCITY : provider.city,
            PRCOUN : provider.country,
            PRCREA : provider.creation_date,
            PRMOD : provider.last_update,
            PRMODID : provider.last_updater,
            PRDEL : provider.delete_date
        }
    }
}