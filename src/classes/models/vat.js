export class Vat {

    constructor(vat) {
        this.code = vat.VATCODE;
        this.rate = vat.VATRATE;
        this.description = vat.VATDESC;
        this.creation_date = vat.VATCREA;
        this.last_update = vat.VATMOD;
        this.last_updater = vat.VATODID;
        this.del = vat.VATDEL;
    }

    static reverse(vat) {
        return {
            VATCODE: vat.code,
            VATRATE: vat.rate,
            VATDESC: vat.description,
            VATCREA: vat.creation_date,
            VATMOD: vat.last_update,
            VATODID: vat.last_updater,
            VATDEL: vat.del,
        }
    }
}