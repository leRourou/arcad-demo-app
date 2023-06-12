export class Country {

    constructor(country) {
        this.id = country.ID;
        this.name = country.NAME;
        this.iso_code = country.ISO_CODE;
    }

    static get columns() {
        return [
            { name: "id", type: "number", displayName: "ID", display: true },
            { name: "name", type: "string", displayName: "Name", display: true },
            { name: "iso_code", type: "string", displayName: "ISO Code", display: true }
        ]
    }

    static empty() {
        return {
            id: 0,
            name: "",
            iso_code: ""
        }
    }

    static getErrors(country) {
        const errors = [];
        if (!country.name) {
            errors.push("The name is required.");
        }
        if (!country.iso_code) {
            errors.push("The ISO code is required.");
        }
        if (country.iso_code.length !== 3) {
            errors.push("The ISO code must be 3 characters long.");
        }
        return errors;
    }

    static toAPIFormat(country) {
        return {
            ID: country.id,
            NAME: country.name,
            ISO_CODE: country.iso_code
        }
    }
}