import React, { useState } from "react";
import "../style/data-table.scss";
import { formatCell } from "./formatFunctions";
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

    // Displays the columns of the table
    function displayHeaders() {
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

    // Displays the data of the table
    function displayData() {
        return (
            <tbody>
                {data.map((item) => (
                    <tr key={item.id} onClick={() => handleRowClick(item.id)}>
                        {
                            columns.filter(c => c.display).map((column) => (
                                formatCell(columns, column.name, item[column.name])
                            ))
                        }
                    </tr>
                ))}
            </tbody>
        );
    }

    return (
        <>
            <table>
                {displayHeaders()}
                {displayData(data)}
            </table>
            <br></br>
        </>
    );
}


