import React, {useContext} from 'react';

import {AuthContext} from '../../context/AuthContext';
import Job from './job';
import PinJobMenu from './pinMenu';


const SearchResults = () => {
    const {searchResults} = useContext(AuthContext);

    return (
        <div className="results-container">
        <PinJobMenu/>
            {
                (searchResults && searchResults.length === 0) ?
                    (<div className="no-results" >
                        No results found. Try using broader search terms.
                    </div>)
                : null
                
            }
               
            {
                searchResults ? searchResults.map((e, i )=> {
                   
                    return (
                        <Job key={e.id} job={e} index={i}/>
                    )
                    }): null
            }
               

        </div>
    )
}

export default SearchResults;