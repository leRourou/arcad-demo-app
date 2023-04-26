// VAT Model
export function createVATModel(vat) {
    return {
        code : vat.VATCODE,
        rate : vat.VATRATE,
        description : vat.VATDESC,
        creation_date : vat.VATCREA,
        last_update : vat.VATMOD,
        last_updater : vat.VATODID,
        del : vat.VATDEL,
    }
}

// Reverse VAT Model
export function reverseVATrModel(vat) {
    return {
        VATCODE : vat.code,
        VATRATE : vat.rate,
        VATDESC : vat.description,
        VATCREA : vat.creation_date,
        VATMOD : vat.last_update,
        VATODID : vat.last_updater,
        VATDEL : vat.del,
    }
}