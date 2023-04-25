import React, { useState } from 'react';
import '../style/search-bar.scss';

function SearchBar(props) {

    const [autoSearch, setAutoSearch] = useState(false);

    function handleSearch(event) {
        if (autoSearch) {
            props.onSearch(event.target.value);
        }
    }

    function handleSearchKey(event) {
        if (event.key === "Enter") {
            props.onSearch(event.target.value);
        }
    }

    function handleRecommended(event) {
        props.onRecommended(event.target.checked);
    }

    return (
        <div className='search-bar-container'>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder={props.placeholder}
                    onKeyDown={handleSearchKey}
                    onChange={handleSearch}
                />
            </div>

            <div className='options'>
                <input type="checkbox" id="autoSearch" name="autoSearch" onChange={(e) => setAutoSearch(e.target.checked)}></input>
                <label htmlFor="autoSearch">Search by typing (less efficient)</label>
                <input type="checkbox" id="recommended" name="recommended" onChange={handleRecommended} />
                <label htmlFor="recommended">Include recommended results</label>
            </div>
            
        </div>
    )
}

export default SearchBar;