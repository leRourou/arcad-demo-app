// Formats a cell
export function formatCell(columns, key, value) {
    const column = columns.find((column) => column.name === key);
    switch (column.type) {
        case "price":
            return <td style={{ textAlign: "end" }} key={key}>{formatNumber(value)} €</td>;
        case "date":
            return <td key={key}>{formatDate(new Date(value))}</td>;
        case "strDate":
            return <td key={key}>{formatDate(strToDate(value))}</td>;
        case "8dDate":
            return <td key={key}>{value}</td>;
        default:
            return <td key={key}>{value}</td>;
    }
}

// Formats a number
function formatNumber(num) {
    if (typeof num !== 'number') {
        return '';
    }

    let str = num.toString().replace(/[\s,]/g, '');

    if (str.charAt(0) === '.') {
        str = '0' + str;
    }

    let parts = str.split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? '.' + parts[1] : '.00';

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    if (decimalPart.length > 3) {
        decimalPart = parseFloat(decimalPart).toFixed(2);
    } else if (decimalPart.length === 2) {
        decimalPart += '0';
    }

    return integerPart + decimalPart;
}

// Formats a date
function formatDate(dateToFormat) {
    const NOW = new Date();
    const DELTA = NOW - dateToFormat;

    if (DELTA < 0) {
        return "In the future";
    }

    if (DELTA < 60 * 1000) {
        return "Just now";
    }
    if (DELTA < 60 * 60 * 1000) {
        const minutes = Math.floor(DELTA / (60 * 1000));
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
    else if (DELTA < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(DELTA / (60 * 60 * 1000));
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
    else if (DELTA < 30 * 24 * 60 * 60 * 1000) {
        const days = Math.floor(DELTA / (24 * 60 * 60 * 1000));
        return `${days} day${days > 1 ? "s" : ""} ago`;
    }
    else if (DELTA < 365 * 24 * 60 * 60 * 1000) {
        const months = Math.floor(DELTA / (30 * 24 * 60 * 60 * 1000));
        return `${months} month${months > 1 ? "s" : ""} ago`;
    }
    else {
        const years = Math.floor(DELTA / (365 * 24 * 60 * 60 * 1000));
        return `${years} year${years > 1 ? "s" : ""} ago`;
    }
}

// Converts a string formatted MMDDYYYY to a Date
function strToDate(str) {
    var date = new Date();
    str = str.toString();
    date.setFullYear(str.substring(0, 4));
    date.setMonth(str.substring(5, 7));
    date.setDate(str.substring(8, 10));
    return date;
}

function formatPrice(price) {
    return price.toFixed(2).replace('.', ',');
}
