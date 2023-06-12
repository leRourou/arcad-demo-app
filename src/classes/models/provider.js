export class Provider {

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

    static getErrors(provider) {
        let errors = [];

        if (provider.name === "") {
            errors.push("The name can't be empty");
        }

        if (provider.phone.length > 15) {
            errors.push("The phone number must be less than 15 characters long");
        }

        if (provider.vat_id.length > 15) {
            errors.push("The VAT ID must be less than 15 characters long");
        }

        if (provider.mail.length > 50) {
            errors.push("The mail must be less than 50 characters long");
        }

        if (provider.address.length > 50) {
            errors.push("The address must be less than 50 characters long");
        }

        if (provider.zipCode.length > 10) {
            errors.push("The zip code must be less than 10 characters long");
        }

        if (provider.city.length > 30) {
            errors.push("The city must be less than 30 characters long");
        }

        return errors;
    }

    static toAPIFormat(provider) {
        return {
            ID: provider.id,
            NAME: provider.name,
            CONTACT: provider.contact,
            PHONE: provider.phone,
            VAT_ID: provider.vat_id,
            EMAIL: provider.mail,
            ADDRESS_LINE_1: provider.address,
            ADDRESS_LINE_2: provider.address2,
            ADDRESS_LINE_3: provider.address3,
            ZIPCODE: provider.zipCode,
            CITY: provider.city,
            COUNTRY_ID: provider.country_id,
            CREATION_DATE: provider.creation_date,
            LAST_MODIFICATION: provider.last_update,
            LAST_MODIFIER_ID: provider.last_modifier_id,
            DELETED: provider.delete_date,
        }
    }
}