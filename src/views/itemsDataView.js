import React, { useState } from 'react';
import SearchBar from '../components/searchBar';
import DataTable from '../components/dataTable.js';
import Fuse from 'fuse.js'
import ModifyArticle from './articleView';
import store from '../store.js';

export default function ItemsView(props) {
    const { columns, title, data, /*singleTitle*/ } = props;

    // STATES
    const [searchTerm] = useState("");
    const [displayedData, setDisplayedData] = useState(data());
    const [recommended, setRecommended] = useState(false);
    const [showItem, setshowItem] = useState(false);
    /*const [addItem, setAddItem] = useState(false);*/

    document.title = title;


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

            const fuse = new Fuse( data(), options);
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
        Search(searchTerm);
    }

    function ItemView() {
        switch (title) {
            case "Articles":
                return (<ModifyArticle
                    data={
                        data().find((item) => item.id === showItem)
                    }
                    removeItemView={() => setshowItem(false)}
                />)
            default:
                return (<div></div>)
        }
    }

    return (
        <div id='view'>

            <h1 id="section-title">{title}</h1>

            {/*<button id="add-button" onClick={() => setAddItem(true)}>{"Add " + singleTitle}</button>*/}

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

            {showItem > 0 && <ItemView />}

            {/*addItem && <ItemView />*/}

        </div>
    )
}