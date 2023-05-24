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
        this.id = familly.ID;
        this.description = familly.DESCRIPTION;
        this.vat_id = familly.VAT_ID;
        this.creation_date = familly.CREATION_DATE;
        this.last_modification = familly.LAST_MODIFICATION;
        this.last_modifier_id = familly.LAST_MODIFIER_ID; 
        this.deleted = familly.DELETED;
    }

    static get columns() {
        return [
            { name: "id", type: "number", displayName: "ID", display: true },
            { name: "description", type: "string", displayName: "Description", display: true },
            { name: "vat_id", type: "string", displayName: "VAT ID", display: false },
            { name: "creation_date", type: "date", displayName: "Creation Date", display: false },
            { name: "last_modification", type: "date", displayName: "Last Modification", display: true },
            { name: "last_modifier_id", type: "string", displayName: "Last Modifier ID", display: false },
            { name: "deleted", type: "string", displayName: "Deleted", display: false }
        ]
    }

    static empty() {
        return {
            id: null,
            description: null,
            vat_id: null,
            creation_date: null,
            last_modification: null,
            last_modifier_id: null,
            deleted: null
        }
    }

    /**
     * @method
     * @param {Familly} familly - The familly data.
     * @returns {Object} - The familly data in the format required by the API.
     * @description - This method is used to convert a familly object into the format required by the API.
     */

    static toAPIFormat(familly) {
        return {
            ID: familly.id,
            DESCRIPTION: familly.description,
            VAT_ID: familly.vat_id,
            CREATION_DATE: familly.creation_date,
            LAST_MODIFICATION: familly.last_modification,
            LAST_MODIFIER_ID: familly.last_modifier_id,
            DELETED: familly.deleted
        }
    }

    static getErrors(article) {
        const errors = [];
        if (!article.description) {
            errors.push("Description is required");
        }

        if (article.description.length > 50) {
            errors.push("Description must be less than 50 characters");
        }

        return errors;
    }

}