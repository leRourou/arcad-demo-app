import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchBar';
import DataTable from '../components/dataTable.js';
import Fuse from 'fuse.js'
import ModifyArticle from './articleView';
import Loading from '../views/misc/loadingView.js'
import { getAllArticles } from '../services/articleServices.js'

export default function ItemsView(props) {

    // PROPS
    const { columns, title, data, singleTitle } = props;

    // STATES
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [displayedData, setDisplayedData] = useState(data());
    const [recommended, setRecommended] = useState(false);
    const [showItem, setshowItem] = useState(false);
    const [addItem, setAddItem] = useState(false);

    document.title = title;

    // DATA LOAD
    async function LoadData() {
        await getAllArticles();
        setLoading(false);
    }

    useEffect(() => {

        if (data().length > 0) {
            setLoading(false);
            return;
        }

        LoadData();
    }, [title, data]);


    function Search(search) {
        // If search term is empty, display all data
        if (search === "") {
            setDisplayedData(data());
            return;
        }

        // If recommended option is checked, use Fuse.js
        if (recommended) {

            const options = {
                keys: Object.entries(columns).map(([key, value]) => value.name),
            };

            const fuse = new Fuse(data(), options);
            setDisplayedData(fuse.search(search).map(({ item }) => item));
            return;
        }

        // Else, use a simple filter
        const newData = data().filter((item) => {
            return (
                Object.entries(columns).map(([key, value]) => item[value.name])
                    .join(" ")
                    .toLowerCase()
                    .indexOf(search.toLowerCase()) > -1
            );
        });

        // Update filtered data
        setDisplayedData(newData);
    }

    // Search
    function handleSearch(searchTerm) {
        setSearchTerm(searchTerm);
        Search(searchTerm);
    }

    function ItemView(props) {

        var { type } = props;

        var dataToPass = data().find((item) => item.id === showItem)

        switch (title) {
            case "Articles":
                if (type === "adding") {
                    dataToPass = {
                        description: "Article",
                        sold_price: "0.00",
                        wholesale_price: "0.00",
                        family: "",
                        stock: "0",
                        quantity_min: "0",
                        quantity_provided: "0",
                        tax_id: "",
                    }
                }
                return (<ModifyArticle
                    data={dataToPass}
                    removeModal={() => { setshowItem(false); setAddItem(false); Search(searchTerm);}}
                    type={props.type}
                />)
            default:
                return (<div></div>)
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div id='view'>

            <h1 id="section-title">{title}</h1>

            <button id="add-button" onClick={() => setAddItem(true)}>{"Add " + singleTitle}</button>

            <SearchBar
                placeholder={"Search for " + title.toLowerCase() + "..."}
                onSearch={handleSearch}
                onRecommended={() => setRecommended(!recommended)}
            />

            <DataTable
                search={searchTerm}
                data={displayedData}
                columns={columns}
                onRowClick={(id) => {
                    setshowItem(id)
                }}
                maxResults={50}
            />

            {showItem > 0 && <ItemView type="modify" />}

            {addItem && <ItemView type="adding" />}

        </div>
    )
}