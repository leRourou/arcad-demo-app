// Provider Model
export function createProviderModel(provider) {
    return {
        id: provider.PRID,
        name : provider.PROVNM,
        cont : provider.PROVCONT,  // ???
        phone : provider.PRPHONE,
        vat : provider.PROVVAT,
        mail : provider.PRMAIL,
        address : provider.PRLINE1,
        adress2 : provider.PRLINE2,
        adress3 : provider.PRLINE3,
        zip : provider.PRZIP,
        city : provider.PRCITY,
        country : provider.PRCOUN,
        creation_date : provider.PRCREA,
        last_update : provider.PRMOD,
        last_updater : provider.PRMODID,
        delete_date : provider.PRDEL,
    }
}

// Reverse Provider Model
export function reverseProviderrModel(provider) {
    return {
        PRID: provider.id,
        PROVNM : provider.name,
        PROVCONT : provider.cont,
        PRPHONE : provider.phone,
        PROVVAT : provider.vat,
        PRMAIL : provider.mail,
        PRLINE1 : provider.address,
        PRLINE2 : provider.adress2,
        PRLINE3 : provider.adress3,
        PRZIP : provider.zip,
        PRCITY : provider.city,
        PRCOUN : provider.country,
        PRCREA : provider.creation_date,
        PRMOD : provider.last_update,
        PRMODID : provider.last_updater,
        PRDEL : provider.delete_date
    }
}