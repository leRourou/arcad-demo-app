/**
 * Represents a vat.
 * @class
 * @category Models
 * @property {string} code - The vat code.
 * @property {number} rate - The vat rate.
 * @property {string} description - The vat description.
 * @property {string} creation_date - The vat creation date.
 * @property {string} last_update - The vat last update date.
 * @property {string} last_updater - The odid of the last {@link Customer} who modified the vat.
 * @property {number} del - The vat del.
 */

export class Vat {
    /**
     * @constructor
     * @param {Object} vat - The vat data as an object just like it is in the database.
     * @description - This constructor is used to create a vat object.
     */
    constructor(vat) {
        this.code = vat.VATCODE;
        this.rate = vat.VATRATE;
        this.description = vat.VATDESC;
        this.creation_date = vat.VATCREA;
        this.last_update = vat.VATMOD;
        this.last_updater = vat.VATODID;
        this.del = vat.VATDEL;
    }

    /**
     * @method
     * @param {Vat} vat - The vat data.
     * @returns {Object} - The vat data in the format required by the API.
     * @description - This method is used to convert a vat object into the format required by the API.
     */
    static reverse(vat) {
        return {
            VATCODE: vat.code,
            VATRATE: vat.rate,
            VATDESC: vat.description,
            VATCREA: vat.creation_date,
            VATMOD: vat.last_update,
            VATODID: vat.last_updater,
            VATDEL: vat.del,
        }
    }
}