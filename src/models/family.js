// Family Model
export function createFamilyModel(family) {
    return {
        id : family.FAID,
        description : family.FADESC,
        tcd : family.FATCD, // ???
        creation_date : family.FACREA,
        last_update : family.FAMOD,
        odid : family.FAODID, // ???
        total_vat : family.FATOTVAT, // ?
    }
}

// Reverse Family Model
export function reverseFamilyModel(family) {
    return {
        FAID : family.id,
        FADESC : family.description,
        FATCD : family.tcd,
        FACREA : family.creation_date,
        FAMOD : family.last_update,
        FAODID : family.odid,
        FATOTVAT : family.total_vat
    }
}