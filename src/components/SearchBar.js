import React from 'react';
import '../style/search-bar.scss';

/**
 * @module SearchBar
 * @category Components
 * @description - This component is used to display a search bar.
 * @param {Array} props 
 */
function SearchBar(props) {


    function handleSearchKey(event) {
        if (event.key === "Enter") {
            props.onSearch(event.target.value);
        }
    }

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder={props.placeholder}
                onKeyDown={handleSearchKey}
            />
        </div> 
    )
}

export default SearchBar;