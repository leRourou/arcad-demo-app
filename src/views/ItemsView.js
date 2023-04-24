import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable.js';
import Fuse from 'fuse.js'
import ModifyArticle from './modifyArticleView';
import Customer from './CustomerView';
//import Filters from '../components/filterList.js';

export default function ItemsView(props) {

    const { columns, tags, title, data, categories, singleTitle } = props;

    // STATES
    const [searchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(data);
    const [recommended, setRecommended] = useState(false);
    const [showItem, setshowItem] = useState(false);

    document.title = title;

    // Search
    function handleSearch(searchTerm) {

        // If search term is empty, display all data
        if (searchTerm === "") {
            setFilteredData(data);
            return;
        }

        // If recommended option is checked, use Fuse.js
        if (recommended) {

            const options = {
                keys: Object.entries(columns).map(([key, value]) => value.name),
            };

            const fuse = new Fuse(data, options);
            setFilteredData(fuse.search(searchTerm).map(({ item }) => item));
            return;
        }

        // Else, use a simple filter
        const newData = data.filter((item) => {
            return (
                Object.entries(columns).map(([key, value]) => item[value.name])
                    .join(" ")
                    .toLowerCase()
                    .indexOf(searchTerm.toLowerCase()) > -1
            );
        });
        setFilteredData(newData);
    }

    function ItemView() {
        switch (title) {
            case "Articles":
                return (<ModifyArticle
                    data={
                        data.find((item) => item.id === showItem)
                    }
                    removeItemView={() => setshowItem(false)}
                    categories={categories}
                />)
            case "Customers":
                return (<Customer
                    data={
                        data.find((item) => item.id === showItem)
                    }
                    removeItemView={() => setshowItem(false)}
                    categories={categories}
                />)
            default:
                return (<div></div>)
        }
    }

    return (
        <div id='view'>

            <h1 id="section-title">{title}</h1>

            <button>{"Add a " + singleTitle}</button>

            <SearchBar
                placeholder={"Search for " + title.toLowerCase() + "..."}
                onSearch={handleSearch}
                onRecommended={() => setRecommended(!recommended)}
            />

            {/*<Filters filters={tags} />*/}

            <DataTable
                tags={tags}
                search={searchTerm}
                data={filteredData}
                columns={columns}
                onRowClick={(id) => {
                    setshowItem(id)
                }}
            />

            {showItem > 0 && <ItemView />}

        </div>
    )
}