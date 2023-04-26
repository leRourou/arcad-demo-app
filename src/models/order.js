// Order Model
export function createOrderModel(order) {
    return {
        id : order.ORID,
        year : order.ORYEAR,
        customerId : order.ORCUID,
        date : order.ORDATE,
        delete_date : order.ORDELDATE,
        clo_date : order.ORCLODATE, // ???
    }
}

// Reverse Order Model
export function reverseOrderrModel(order) {
    return {
        ORID : order.id,
        ORYEAR : order.year,
        ORCUID : order.customerId,
        ORDATE : order.date,
        ORDELDATE : order.delete_date,
        ORCLODATE : order.clo_date,
    }
}