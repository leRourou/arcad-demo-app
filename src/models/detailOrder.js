// DetailOrder Model
export function createDetailOrderModel(detailOrder) {
    return {
        id : detailOrder.ODORID,
        year : detailOrder.ODYEAR,
        line : detailOrder.ODLINE,
        articleId : detailOrder.ODARID,
        quantity : detailOrder.ODQTY,
        quantityLivred : detailOrder.ODQTYLIV, // ?
        price : detailOrder.ODPRICE,
        total : detailOrder.ODTOT,
        totalVat : detailOrder.ODTOTVAT, // ???
    }
}

// Reverse DetailOrder Model
export function reverseDetailOrderModel(detailOrder) {
    return {
        ODORID : detailOrder.id,
        ODYEAR : detailOrder.year,
        ODLINE : detailOrder.line,
        ODARID : detailOrder.articleId,
        ODQTY : detailOrder.quantity,
        ODQTYLIV : detailOrder.quantityLivred,
        ODPRICE : detailOrder.price,
        ODTOT : detailOrder.total,
        ODTOTVAT : detailOrder.totalVat,
    }
}