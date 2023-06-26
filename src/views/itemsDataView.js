import React, { useCallback, useEffect, useState } from 'react';
import SearchBar from '../components/searchBar';
import DataTable from '../components/dataTable.js';
import ModifyArticle from './articleView';
import ModifyCountry from './countryView';
import ModifyCustomer from './customerView';
import ModifyOrder from './orderView';
import ModifyProvider from './providerView';
import Loading from '../views/misc/loadingView.js'
import { useParams } from 'react-router-dom';

export default function ItemsView(props) {

    const { columns, title, singleTitle, getAll, getLength } = props;

    document.title = title;

    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showItem, setshowItem] = useState(false);
    const [dataLength, setDataLength] = useState(0);
    const [addItem, setAddItem] = useState(false);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [maxResults] = useState(100);

    const MAX_DISPLAYED_BUTTONS = 7; // Must be odd
    const LAST_PAGE = Math.ceil(dataLength / maxResults)
    const MAX_PAGES = Math.min(LAST_PAGE, MAX_DISPLAYED_BUTTONS);
    const NB_BUTTONS_TO_DISPLAY = MAX_DISPLAYED_BUTTONS < LAST_PAGE;

    let { id } = useParams();

    const getData = useCallback(async () => {
        setLoading(true);
        if (title !== "Orders")
            setData(await getAll(maxResults, preventSQLInsert(searchTerm), page));
        else
            setData(await getAll(maxResults, page));
        setDataLength(await getLength());
        setLoading(false);
    }, [maxResults, searchTerm, page, getAll, getLength]);

    useEffect(() => {
        setPage(1);
        removeModal(false);
        setshowItem(id ? id : false);
    }, [title])

    useEffect(() => {
        const fetchData = async () => {
            await getData();
        };

        fetchData();
    }, [searchTerm, getData, page])

    function handleSearch(searchTerm) {
        setPage(1);
        setSearchTerm(searchTerm);
    }

    function ItemView(props) {
        const { type, showItem } = props;
        const itemProps = {
            itemId: showItem,
            removeModal: (reload) => { removeModal(reload) },
            type: type
        };
    
        switch (title) {
            case "Articles":
                return <ModifyArticle {...itemProps} />;
            case "Countries":
                return <ModifyCountry {...itemProps} />;
            case "Customers":
                return <ModifyCustomer {...itemProps} />;
            case "Orders":
                return <ModifyOrder {...itemProps} />;
            case "Providers":
                return <ModifyProvider {...itemProps} />;
            default:
                break;
        }
    }

    function removeModal(reload) {
        setshowItem(false);
        setAddItem(false);
        if (reload)
            getData()
    }

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

    function displayPageButtons() {

        var buttons = []

        if (!NB_BUTTONS_TO_DISPLAY) {
            for (let i = 1; i <= LAST_PAGE; i++) {
                buttons.push(i);
            }
        } else if (page < MAX_DISPLAYED_BUTTONS / 2) {
            for (let i = 1; i <= MAX_PAGES; i++) {
                buttons.push(i);
            }
        } else if (page > LAST_PAGE - MAX_DISPLAYED_BUTTONS / 2) {
            for (let i = LAST_PAGE - MAX_DISPLAYED_BUTTONS + 1; i <= LAST_PAGE; i++) {
                buttons.push(i);
            }
        } else {
            for (let i = page - Math.floor(MAX_DISPLAYED_BUTTONS / 2); i <= page + Math.floor(MAX_DISPLAYED_BUTTONS / 2); i++) {
                buttons.push(i);
            }
        }

        return (
            <div id="buttons-page-container">

                {NB_BUTTONS_TO_DISPLAY && pageButton(1, page === 1 || loading ? "disabled" : "", "<<")}
                {NB_BUTTONS_TO_DISPLAY && pageButton(page - 1, page === 1 || loading ? "disabled" : "", "<")}

                {buttons.map((value) => {
                    let classNameButton = ""
                    if (value === page)
                        classNameButton = "active"
                    if (loading)
                        classNameButton = "disabled"
                    return pageButton(value, classNameButton, value)
                })}

                {NB_BUTTONS_TO_DISPLAY && pageButton(page + 1, page === LAST_PAGE || loading ? "disabled" : "", ">")}
                {NB_BUTTONS_TO_DISPLAY && pageButton(LAST_PAGE, page === LAST_PAGE || loading ? "disabled" : "", ">>")}

            </div>
        )
    }

    function addButton() {
        if (title === "Countries" || title === "Providers" || title === "Orders")
            return;
        return (
            <button id="add-button" onClick={() => setAddItem(true)}>{"Add " + singleTitle}</button>
        )
    }

    return (
        <div id='view'>

            <h1 id="section-title">{title}</h1>

            {addButton()}

            {
                (title !== "Orders") &&
                <SearchBar
                    placeholder={"Search for " + title.toLowerCase() + "..."}
                    onSearch={handleSearch}
                />

            }

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
