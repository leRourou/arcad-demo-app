export class Customer {

    constructor(customer) {
        this.id = customer.ID;
        this.name = customer.NAME;
        this.phone = customer.PHONE;
        this.vat_id = customer.VAT_ID;
        this.email = customer.EMAIL;
        this.address = customer.ADDRESS_LINE_1;
        this.address2 = customer.ADDRESS_LINE_2;
        this.address3 = customer.ADDRESS_LINE_3;
        this.city = customer.CITY;
        this.zipCode = customer.ZIP_CODE;
        this.country_id = customer.COUNTRY_ID;
        this.credit_limit = customer.CREDIT_LIMIT;
        this.credit = customer.CREDIT;
        this.last_order = customer.LAST_ORDER;
        this.creation = customer.CREATION_DATE;
        this.last_update = customer.LAST_UPDATE;
        this.last_modifier_id = customer.LAST_MODIFIER_ID;
        this.deleted = customer.DELETED;
    }

    static get columns() {
        return [
            { name: "id", type: "number", displayName: "ID", display: true },
            { name: "name", type: "string", displayName: "Name", display: true },
            { name: "phone", type: "string", displayName: "Phone", display: true },
            { name: "vat_id", type: "string", displayName: "VAT", display: false },
            { name: "mail", type: "string", displayName: "Mail", display: false },
            { name: "address", type: "string", displayName: "Address", display: false },
            { name: "address2", type: "string", displayName: "Address 2", display: false },
            { name: "address3", type: "string", displayName: "Address 3", display: false },
            { name: "city", type: "string", displayName: "City", display: true },
            { name: "zipCode", type: "string", displayName: "Zip Code", display: true },
            { name: "country_id", type: "string", displayName: "Country", display: false },
            { name: "credit_limit", type: "number", displayName: "Credit Limit", display: false },
            { name: "credit", type: "number", displayName: "Credit", display: false },
            { name: "last_order", type: "strDate", displayName: "Last Order", display: true  },
            { name: "creation", type: "date", displayName: "Creation", display: false },
            { name: "last_update", type: "date", displayName: "Last Update", display: false },
            { name: "modid", type: "number", displayName: "Modid", display: false },
            { name: "del", type: "number", displayName: "Del", display: false }
        ]
    }

    static empty() {
        return {
            id: 0,
            name: "",
            phone: "",
            vat_id: "",
            mail: "",
            address: "",
            adress2: "",
            adress3: "",
            city: "",
            zipCode: "",
            country_id: "",
            credit_limit: 0,
            credit: 0,
            last_order: "",
            creation: "",
            last_update: "",
            last_modifier_id: 0,
            deleted: 0
        }
    }

    static getErrors(customer) {
        let errors = [];

        if (customer.name === "") {
            errors.push("Name is required");
        }

        if (customer.phone === "") {
            errors.push("Phone is required");
        }

        if (customer.city === "") {
            errors.push("City is required");
        }

        if (customer.zipCode === "") {
            errors.push("Zip Code is required");
        }

        if (customer.country_id === "") {
            errors.push("Country is required");
        }

        return errors;
    }

    static toAPIFormat(customer) {
        return {
            ID: customer.id,
            NAME: customer.name,
            PHONE: customer.phone,
            VAT_ID: customer.vat_id,
            EMAIL: customer.mail,
            ADDRESS_LINE_1: customer.address,
            ADDRESS_LINE_2: customer.address2,
            ADDRESS_LINE_3: customer.address3,
            CITY: customer.city,
            ZIP_CODE: customer.zipCode,
            COUNTRY_ID: customer.country_id,
            CREDIT_LIMIT: customer.credit_limit,
            CREDIT: customer.credit,
            LAST_ORDER: customer.last_order,
            CREATION_DATE: customer.creation,
            LAST_UPDATE: customer.last_update,
            LAST_MODIFIER_ID: customer.last_modifier_id,
            DELETED: customer.deleted
        }
    }
}
