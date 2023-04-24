import React, { useState } from 'react'
import Filter from './filter.js'

export default function Filters(props) {

    // TODO : Add a filter
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