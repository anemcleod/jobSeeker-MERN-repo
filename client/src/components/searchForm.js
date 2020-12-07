import React from 'react';

const SearchForm = () => {
    return (
        <form action="" className="search-form-main">
            <input type="text" name="keywords"  placeholder="job title, keywords" className="input-basic drop-shadow"/>
            <input type="text" name="location"  placeholder="city or state" className="input-basic drop-shadow"/>
            <button type="submit" className="btn-basic drop-shadow">search</button>
        </form>
    )
}

export default SearchForm;