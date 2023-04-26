import React, {useEffect, useState} from "react";
import "../style/data-table.scss";
import store from "../store";

// Enum for the sort directions
const sortTypes = {
    asc: -1,
    desc: 1
}

function DataTable(props) {

    // Props
    const {columns, onRowClick, maxResults } = props;

    // States
    const [data, setData] = useState(props.data);
    const [currentSort, setCurrentSort] = useState({ column: columns[0].name, direction: sortTypes.desc });
    const [currentPage, setCurrentPage] = useState(1);

    // Make the data reload when the search term changes
    useEffect(() => {
        setData(props.data);
        setCurrentPage(1);
    }, [props.data]);

    store.subscribe(() => {
        setData(store.getState().articles);
    });

    // Redirect to the product page when clicking on a row
    function handleRowClick(id) {
        onRowClick(id);
    }

    // Display the number of results
    function nbResults() {
        if (data.length === 0) {
            return "No results";
        }
        else if (data.length > 1) {
            return data.length + " correspondances";
        } else {
            return "1 correspondance";
        }
    }

    // Display the column names
    function displayColumns() {
        const columnsToDisplay = columns.filter(c => c.display)
        return (
            <thead>
                <tr>
                    {columnsToDisplay.map((column) => (
                        <th onClick={() => sortData(column.name)} key={column.id}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                {column.displayName}
                                {currentSort.column === column.name && currentSort.direction === sortTypes.desc && <p style={{ margin: "0px", marginLeft: "5px" }}>▼</p>}
                                {currentSort.column === column.name && currentSort.direction === sortTypes.asc && <p style={{ margin: "0px", marginLeft: "5px" }}>▲</p>}
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
        );
    }

    // Display the data in the table
    function displayData(products) {

        // Format the cell according to the column type (ex : price => add €)
        function formatCell(key, value) {
            const column = columns.find((column) => column.name === key);
            switch (column.type) {
                case "price":
                    return <td key={value}>{value}€</td>;
                default:
                    return <td key={value}>{value}</td>;
            }
        }

        const displayedProducts = products.slice((currentPage - 1) * maxResults, (currentPage - 1) * maxResults + maxResults)

        return (
            <tbody>
                {displayedProducts.map((product) => (
                    <tr key={product.id} onClick={() => handleRowClick(product.id)}>
                        {
                            // Display only the columns that have the display property on TRUE and that are not the id
                            Object.entries(product)
                                .filter(([key]) => key !== "id")
                                .filter(([key]) => columns.find((column) => column.name === key).display)
                                .map(([key, value]) => formatCell(key, value))
                        }
                    </tr>
                ))}
            </tbody>
        );
    }

    // Sort data 
    function sortData(column) {

        var sort = {};
        sort.column = column;
        sort.direction = currentSort.direction === sortTypes.asc ? sortTypes.desc : sortTypes.asc;

        const sortedData = [...data].sort((a, b) => {
            switch (typeof a[sort.column]) {
                case "string":
                    return a[sort.column].localeCompare(b[sort.column]) * sort.direction;
                case "number":
                    return (a[sort.column] - b[sort.column]) * sort.direction * -1;
                default:
                    return 0;
            }
        });

        setCurrentSort(sort);
        setData(sortedData)
    }


    return (
        <div>
            <p id="search-results-text">{nbResults()}</p>
            <table>
                {displayColumns()}
                {displayData(data)}
            </table>
            <div id="table-footer"></div>
            <br></br>
            <div id="buttons-page-container">
                
                <p>Showing {(currentPage-1) * maxResults + 1}-{currentPage < Math.ceil(data.length / maxResults) ? (currentPage-1) * maxResults + maxResults : data.length } out of {data.length} results</p>

                <button className="button-page" onClick={() => {
                        if (currentPage > 1)
                            setCurrentPage(currentPage-1)
                    }}>Previous page</button>
                <button className="button-page" onClick={() => {
                        if (currentPage < Math.ceil(data.length / maxResults))
                            setCurrentPage(currentPage+1)
                    }}>Next page</button>
            </div>
        </div>
    );
}

export default DataTable;
