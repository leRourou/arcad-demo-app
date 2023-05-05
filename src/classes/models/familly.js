/**
 * Represents a familly.
 * @class
 * @category Models
 * @property {number} id - The familly ID.
 * @property {string} description - The familly description.
 * @property {string} tcd - ???.
 * @property {string} creation_date - The familly creation date.
 * @property {string} last_update - The familly last update date.
 * @property {string} odid - The odid of the last {@link Customer} who modified the familly.
 * @property {number} total_vat - The familly total {@link VAT}.
 */

export class Familly {

    /**
     * @constructor
     * @param {Object} familly - The familly data as an object just like it is in the database.
     * @description - This constructor is used to convert a familly object into the format required by the API.
     */
    constructor(familly) {
        this.id = familly.FAID;
        this.description = familly.FADESC;
        this.tcd = familly.FATCD; // ???
        this.creation_date = familly.FACREA;
        this.last_update = familly.FAMOD;
        this.odid = familly.FAODID; 
        this.total_vat = familly.FATOTVAT;
    }

    /**
     * @method
     * @param {Familly} familly - The familly data.
     * @returns {Object} - The familly data in the format required by the API.
     * @description - This method is used to convert a familly object into the format required by the API.
     */
    static reverse(familly) {
        return {
            FAID : familly.id,
            FADESC : familly.description,
            FATCD : familly.tcd,
            FACREA : familly.creation_date,
            FAMOD : familly.last_update,
            FAODID : familly.odid,
            FATOTVAT : familly.total_vat
        }
    }
}

// Familly Model
export function createFamillyModel(familly) {
    return {
        id : familly.FAID,
        description : familly.FADESC,
        tcd : familly.FATCD, // ???
        creation_date : familly.FACREA,
        last_update : familly.FAMOD,
        odid : familly.FAODID, // ???
        total_vat : familly.FATOTVAT, // ?
    }
}

// Reverse Familly Model
export function reverseFamillyModel(familly) {
    return {
        FAID : familly.id,
        FADESC : familly.description,
        FATCD : familly.tcd,
        FACREA : familly.creation_date,
        FAMOD : familly.last_update,
        FAODID : familly.odid,
        FATOTVAT : familly.total_vat
    }
}