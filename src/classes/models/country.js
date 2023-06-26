export class Country {

    constructor(id, name, iso_code) {
        this.id = id;
        this.name = name;
        this.iso_code = iso_code;
    }

    static getColumns() {
        return [
            { name: "id", type: "number", displayName: "ID", display: true },
            { name: "name", type: "string", displayName: "Name", display: true },
            { name: "iso_code", type: "string", displayName: "ISO Code", display: true }
        ]
    }

    static getEmpty() {
        return new Country(0, "", "");
    }

    static getErrors(country) {
        const errors = [];
        const { name, iso_code } = country;

        // Name
        if (!name) {
            errors.push("The name is required.");
        } else if (country.name.length > 30) {
            errors.push("The name must be less than 30 characters long.");
        }
        
        // ISO code
        if (!iso_code) {
            errors.push("The ISO code is required.");
        } else if (country.iso_code.length !== 3) {
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