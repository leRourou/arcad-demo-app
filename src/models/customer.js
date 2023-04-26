// Customer Model
export function createCustomerModel(customer) {
    return {
        id: customer.CUID,
        name : customer.CUSTNM,
        phone : customer.CUPHONE,
        vat : customer.CUVAT,
        mail : customer.CUMAIL,
        address : customer.CULINE1,
        adress2 : customer.CULINE2,
        adress3 : customer.CULINE3,
        city : customer.CUCITY,
        zipCode : customer.CUZIP,
        country : customer.CUCOUN,
        limcre : customer.CULIMCRE, // ???
        credit : customer.CUCREDIT,
        last_order : customer.CULASTOR,
        creation : customer.CUCREA,
        last_update : customer.CUMOD,
        modid : customer.CUMODID, // ??
        del : customer.CUDEL, // ??
    }
}

// TODO : Add the rest of the fields

// Reverse Customer Model
export function reverseCustomerModel(customer) {
    return {
        CUID: customer.id,
        CUSTNM : customer.name,
        CUPHONE : customer.phone,
        CUVAT : customer.vat,
        CUMAIL : customer.mail,
        CULINE1 : customer.address,
        CULINE2 : customer.adress2,
        CULINE3 : customer.adress3,
        CUCITY : customer.city,
        CUZIP : customer.zipCode,
        CUCOUN : customer.country,
        CULIMCRE : customer.limcre,
        CUCREDIT : customer.credit,
        CULASTOR : customer.last_order,
        CUCREA : customer.creation,
        CUMOD : customer.last_update,
        CUMODID : customer.modid,
        CUDEL : customer.del
    }
}