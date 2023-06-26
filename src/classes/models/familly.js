export class Familly {

    constructor(id, description, vat_id, creation_date, last_modification, last_modifier_id, deleted) {
        this.id = id;
        this.description = description;
        this.vat_id = vat_id;
        this.creation_date = creation_date;
        this.last_modification = last_modification;
        this.last_modifier_id = last_modifier_id;
        this.deleted = deleted;
    }

    static getColumns() {
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
        return new Familly(0, "", "", "", "", "", "");
    }


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
        const { description } = article;

        // Description
        if (!description) {
            errors.push("Description is required");
        }

        // Description length
        if (description.length > 50) {
            errors.push("Description must be less than 50 characters");
        }

        return errors;
    }

}