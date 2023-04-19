import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import DataTable from '../components/DataTable.js';
import Fuse from 'fuse.js'
import Product from './ProductView.js';
import { getAllProducts } from '../services/productServices.js'
import { getAllCategories } from '../services/categoryServices.js'

const columns = [
    { id: 1, name: "Product", type: "string", display: true },
    { id: 2, name: "Price", type: "price", display: true },
    { id: 3, name: "Category", type: "string", display: true },
    { id: 4, name: "Description", type: "string", display: false },
    { id: 5, name: "Quantity", type: "int", display: false },
    { id: 6, name: "DeliveryTime", type: "string", display: false }
];

const tags = [
    { id: 1, name: "Clothes", type: "include" },
    { id: 2, name: "Furniture", type: "exclude" },
    { id: 3, name: "Price < 2000", type: "default" }
];

function ProductsView() {


    document.title = "Products";

    const [searchTerm] = useState("");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [recommended, setRecommended] = useState(false);
    const [showProduct, setShowProduct] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then((data) => {
            setCategories(data);
        });
    }, []);

    // Fetch data from JSON file
    useEffect(() => {
        getAllProducts().then((data) => {
            setData(data);
            setFilteredData(data);
        });
    }, []);

    function onRecommended() {
        setRecommended(!recommended);
    }

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
                keys: ['Product']
            };

            const fuse = new Fuse(data, options);
            setFilteredData(fuse.search(searchTerm).map(({ item }) => item));
            return;
        }

        // Else, use a simple filter
        const newData = data.filter((item) => {
            return (
                item.Product.toLowerCase().includes(searchTerm.toLowerCase())
                ||
                item.Category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setFilteredData(newData);
    }

    return (
        <div id='view'>
            <h1>Products</h1>

            <SearchBar
                placeholder="Search a product"
                onSearch={handleSearch}
                onRecommended={onRecommended}
            />

            <Filters filters={tags} />

            <DataTable
                tags={tags}
                search={searchTerm}
                data={filteredData}
                columns={columns}
                onRowClick={(id) => {
                    setShowProduct(id)
                }}
            />

            {showProduct > 0 && <Product 
                data={
                    data.find((item) => item.id === showProduct)
                }
                categories={categories}
                removeProductView={() => setShowProduct(false)}
            />}
        </div>
    )
}


function Filters(props) {

    // TODO : Add a tag
    const [filters, setFilters] = useState(props.filters)

    function AddFilter() {
        console.log("Add tag")
    }

    return (
        <div id="tags">
            {
                filters.map((filter) => (
                    <Filter
                        key={filter.id}
                        label={filter.name}
                        type={filter.type}
                        onDelete={() => setFilters(filters.filter((f) => f.id !== filter.id))}
                    />
                ))
            }
            <Filter
                key="addFilter"
                label="Add filter"
                type="add"
                onAdd={AddFilter}
            ></Filter>
        </div>
    )
}

export default ProductsView;