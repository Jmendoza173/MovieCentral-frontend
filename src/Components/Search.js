import React from 'react'

const Search = props => {
    return (
        <div className="filter">
            <input
            id="search-bar"
            type="text"
            name="search"
            placeholder="Search Movies"
            // onChange={props.handleSearch} value={props.search}
            />
        </div>
    )
}

export default Search
