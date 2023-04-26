// Country Model
export function createCountryModel(country) {
    return {
        id: country.COID,
        name: country.COUNTR,
        codeISO : country.COISO,
    }
}

// Reverse Country Model
export function reverseCountryModel(country) {
    return {
        COID: country.id,
        COUNTR: country.name,
        COISO : country.codeISO,
    }
}