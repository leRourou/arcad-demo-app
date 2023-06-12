import React, { useState } from "react";
import "../style/data-table.scss";

export default function DataTable(props) {

    // Props
    const { onRowClick } = props;

    // States
    const [data] = useState(props.data);
    const [columns] = useState(props.columns);

    // Redirect to the item page when clicking on a row
    function handleRowClick(id) {
        onRowClick(id);
    }

    function displayColumns() {
        const columnsToDisplay = columns.filter(c => c.display)
        return (
            <thead>
                <tr>
                    {columnsToDisplay.map((column) => (
                        <th className={column.type} key={column.name}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                {column.displayName}
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
        );
    }

    function displayData() {

        function formatCell(key, value) {
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

        return (
            <tbody>
                {data.map((item) => (
                    <tr key={item.id} onClick={() => handleRowClick(item.id)}>
                        {
                            columns.filter(c => c.display).map((column) => (
                                formatCell(column.name, item[column.name])
                            ))
                        }
                    </tr>
                ))}
            </tbody>
        );
    }

    return (
        <div>
            <table>
                {displayColumns()}
                {displayData(data)}
            </table>
            <div id="table-footer"></div>
            <br></br>
        </div>
    );
}

function formatNumber(num) {
    if (typeof num !== 'number') {
        return '';
    }

    var str = num.toString().replace(/[\s,]/g, '');

    if (str.charAt(0) === '.') {
        str = '0' + str;
    }

    var parts = str.split('.');
    var integerPart = parts[0];
    var decimalPart = parts.length > 1 ? '.' + parts[1] : '.00';

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    if (decimalPart.length > 3) {
        decimalPart = parseFloat(decimalPart).toFixed(2);
    } else if (decimalPart.length === 2) {
        decimalPart += '0';
    }

    return integerPart + decimalPart;
}

function formatDate(dateToFormat) {
    const now = new Date();

    const delta = now - dateToFormat;

    if (delta < 0) {
        return "In the future";
    }

    if (delta < 60 * 1000) {
        return "Just now";
    }
    if (delta < 60 * 60 * 1000) {
        const minutes = Math.floor(delta / (60 * 1000));
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
    else if (delta < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(delta / (60 * 60 * 1000));
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
    else if (delta < 30 * 24 * 60 * 60 * 1000) {
        const days = Math.floor(delta / (24 * 60 * 60 * 1000));
        return `${days} day${days > 1 ? "s" : ""} ago`;
    }
    else if (delta < 365 * 24 * 60 * 60 * 1000) {
        const months = Math.floor(delta / (30 * 24 * 60 * 60 * 1000));
        return `${months} month${months > 1 ? "s" : ""} ago`;
    }
    else {
        const years = Math.floor(delta / (365 * 24 * 60 * 60 * 1000));
        return `${years} year${years > 1 ? "s" : ""} ago`;
    }
}

function strToDate(str) {
    var date = new Date();
    str = str.toString();
    date.setFullYear(str.substring(0, 4));
    date.setMonth(str.substring(5, 7));
    date.setDate(str.substring(8, 10));
    return date;
}

  