import React from 'react';
import SearchForm from './searchForm';

const MyJobSearch = () => {
    return (
        <div className="myjobsearch-container">
            <SearchForm />
            <div className="results-container">results here</div>
            <div className="board-container">boards here</div>
        </div>
    )
}

export default MyJobSearch;