import React, { useCallback, useEffect, useState } from 'react';
import SearchBar from '../components/searchBar';
import DataTable from '../components/dataTable.js';
import ModifyArticle from './articleView';
import ModifyFamilly from './famillyView';
import ModifyCountry from './countryView';
import ModifyCustomer from './customerView';
import Loading from '../views/misc/loadingView.js'

export default function ItemsView(props) {

    // PROPS
    const { columns, title, singleTitle, getAll, getLength } = props;

    // STATES
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [recommended, setRecommended] = useState(false);
    const [showItem, setshowItem] = useState(false);
    const [dataLength, setDataLength] = useState(0);
    const [addItem, setAddItem] = useState(false);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [maxResults] = useState(100);

    var maxDisplayedButtons = 7; // Must be odd
    var lastPage = Math.ceil(dataLength / maxResults)
    var maxPages = Math.min(lastPage, maxDisplayedButtons);
    var displayButtons = maxDisplayedButtons < lastPage;

    document.title = title;

    // Get data
    const getData = useCallback(async () => {
        setLoading(true);
        setData(await getAll(maxResults, preventSQLInsert(searchTerm), page));
        setDataLength(await getLength());
        setLoading(false);
    }, [maxResults, searchTerm, page, getAll, getLength]);

    // Set page to 1 when changing the page
    useEffect(() => {
        setPage(1);
        removeModal(false);
    }, [title])

    // Get the data when search term or page changes
    useEffect(() => {
        const fetchData = async () => {
            await getData();
        };

        fetchData();
    }, [searchTerm, getData, page])

    // Search
    function handleSearch(searchTerm) {
        setPage(1);
        setSearchTerm(searchTerm);
    }

    // Display the item view 
    function ItemView(props) {
        var { type } = props;
        switch (title) {
            case "Articles":
                return (
                    <ModifyArticle
                        itemId={showItem}
                        removeModal={(reload) => {removeModal(reload)}}
                        type={type}
                    />)
            case "Families":
                return (
                    <ModifyFamilly
                        itemId={showItem}
                        removeModal={(reload) => {removeModal(reload)}}
                        type={type}
                    />)
            case "Countries":               
                return (
                    <ModifyCountry
                        itemId={showItem}
                        removeModal={(reload) => {removeModal(reload)}}
                        type={type}
                    />)
            case "Customers":
                return (
                    <ModifyCustomer
                        itemId={showItem}
                        removeModal={(reload) => {removeModal(reload)}}
                        type={type}
                    />)
            default:
                break;
        }
    }

    // Remove the modal actually on screen
    function removeModal(reload) {
        setshowItem(false);
        setAddItem(false);
        if (reload)
            getData()
    }

    // Definition of the pageButtons
    function pageButton(nextPage, state, value) {
        var onClick = () => {
            setPage(nextPage)
        }
        var className = "button-page"
        switch (state) {
            case "disabled":
                className += " disabled"
                onClick = () => { }
                break;
            case "active":
                className += " active"
                break;
            default:
                break;
        }

        return (
            <button
                key={value}
                className={className}
                onClick={onClick}>
                {value}
            </button>
        )
    }

    // Display the page buttons
    function displayPageButtons() {

        var buttons = []

        if (!displayButtons) {
            for (let i = 1; i <= lastPage; i++) {
                buttons.push(i);
            }
        } else if (page < maxDisplayedButtons / 2) {
            for (let i = 1; i <= maxPages; i++) {
                buttons.push(i);
            }
        } else if (page > lastPage - maxDisplayedButtons / 2) {
            for (let i = lastPage - maxDisplayedButtons + 1; i <= lastPage; i++) {
                buttons.push(i);
            }
        } else {
            for (let i = page - Math.floor(maxDisplayedButtons / 2); i <= page + Math.floor(maxDisplayedButtons / 2); i++) {
                buttons.push(i);
            }
        }

        return (
            <div id="buttons-page-container">

                {displayButtons && pageButton(1, page === 1 || loading ? "disabled" : "", "<<")}
                {displayButtons && pageButton(page - 1, page === 1 || loading ? "disabled" : "", "<")}

                {buttons.map((value) => {
                    let classNameButton = ""
                    if (value === page)
                        classNameButton = "active"
                    if (loading)
                        classNameButton = "disabled"
                    return pageButton(value, classNameButton, value)
                })}

                {displayButtons && pageButton(page + 1, page === lastPage || loading ? "disabled" : "", ">")}
                {displayButtons && pageButton(lastPage, page === lastPage || loading ? "disabled" : "", ">>")}

            </div>
        )
    }

    function addButton() {
        if (title === "Countries")
            return;
        return (
            <button id="add-button" onClick={() => setAddItem(true)}>{"Add " + singleTitle}</button>
        )
    }

    return (
        <div id='view'>

            <h1 id="section-title">{title}</h1>

            {addButton()}

            <SearchBar
                placeholder={"Search for " + title.toLowerCase() + "..."}
                onSearch={handleSearch}
                onRecommended={() => setRecommended(!recommended)}
            />

            {displayPageButtons()}

            {loading ? <Loading /> :
                <DataTable
                    search={searchTerm}
                    data={data}
                    columns={columns}
                    onRowClick={(id) => {
                        setshowItem(id)
                    }}
                />}

            {showItem !== false && <ItemView type="modify" />}

            {addItem && <ItemView type="adding" />}

        </div>
    )
}

function preventSQLInsert(string) {
    var newString = string.replace(/[^a-zA-Z0-9\s]/g, '');
    return newString;
}
