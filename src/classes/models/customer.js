export class Customer {

    constructor(id, name, phone, vat_id, email, address, address2, address3, city, zipCode, country_id, credit_limit, credit, last_order, creation, last_update, last_modifier_id, deleted) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.vat_id = vat_id;
        this.email = email;
        this.address = address;
        this.address2 = address2;
        this.address3 = address3;
        this.city = city;
        this.zipCode = zipCode;
        this.country_id = country_id;
        this.credit_limit = credit_limit;
        this.credit = credit;
        this.last_order = last_order;
        this.creation = creation;
        this.last_update = last_update;
        this.last_modifier_id = last_modifier_id;
        this.deleted = deleted;
    }

    static getColumns() {
        return [
            { name: "id", type: "number", displayName: "ID", display: true },
            { name: "name", type: "string", displayName: "Name", display: true },
            { name: "phone", type: "string", displayName: "Phone", display: true },
            { name: "vat_id", type: "string", displayName: "VAT", display: false },
            { name: "mail", type: "string", displayName: "Mail", display: false },
            { name: "address", type: "string", displayName: "Address", display: true },
            { name: "address2", type: "string", displayName: "Address 2", display: false },
            { name: "address3", type: "string", displayName: "Address 3", display: false },
            { name: "city", type: "string", displayName: "City", display: true },
            { name: "zipCode", type: "string", displayName: "Zip Code", display: true },
            { name: "country_id", type: "string", displayName: "Country", display: false },
            { name: "credit_limit", type: "number", displayName: "Credit Limit", display: false },
            { name: "credit", type: "number", displayName: "Credit", display: false },
            { name: "last_order", type: "strDate", displayName: "Last Order", display: false  },
            { name: "creation", type: "date", displayName: "Creation", display: false },
            { name: "last_update", type: "date", displayName: "Last Update", display: false },
            { name: "modid", type: "number", displayName: "Modid", display: false },
            { name: "del", type: "number", displayName: "Del", display: false }
        ]
    }

    static getEmpty() {
        return new Customer(0, "", "", "", "", "", "", "", "", "", "", 0, 0, "", "", "", 0, 0);
    }

    static getErrors(customer) {
        let errors = [];
        const { name, phone, city, zipCode, country_id, credit } = customer;

        // Name
        if (name === "") {
            errors.push("Name is required");
        } else if (name.length > 30) {
            errors.push("Name must be less than 30 characters long");
        }

        // Phone
        if (phone === "") {
            errors.push("Phone is required");
        } else if (phone.length > 15) {
            errors.push("Phone must be less than 15 characters long");
        }

        // City
        if (city === "") {
            errors.push("City is required");
        } else if (city.length > 30) {
            errors.push("City must be less than 30 characters long");
        }

        // Zip Code
        if (zipCode === "") {
            errors.push("Zip Code is required");
        } else if (zipCode.length > 10) {
            errors.push("Zip Code must be less than 10 characters long");
        }

        // Country
        if (country_id === "") {
            errors.push("Country is required");
        }

        // Credit
        if (credit === "" || customer.credit === null) {
            errors.push("Credit is required");
        } else if (credit < 0) {
            errors.push("Credit must be greater than 0");
        } else if (credit > 999999999.99) {
            errors.push("Credit must be less than 999999999.99");
        } else if (isNaN(credit)) {
            errors.push("Credit must be a number");
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
            LAST_MODIFIER_ID: customer.last_modifier_id,
            DELETED: customer.deleted
        }
    }
}
