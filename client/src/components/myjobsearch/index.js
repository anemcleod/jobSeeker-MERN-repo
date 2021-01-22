import React, {useState} from 'react';


import SearchForm from '../searchForm';
import MyJobBoards from './myJobBoards';
import SearchResults from './searchResults';
import Nav from './nav';

const MyJobSearch = () => {
    
    const [showSearch, setShowSearch] = useState(false);
    const [showResults, setShowResults] = useState(true);
    const [showBoards, setShowBoards] = useState(false);
   
   
    const showResultsHandler = (e) =>{
      if(e) {
        e.preventDefault();
      }
      setShowResults(true);
      setShowSearch(false);
      setShowBoards(false);
  }

  const showSearchHandler = (e) =>{
      e.preventDefault();
      setShowResults(false);
      setShowSearch(true);
      setShowBoards(false);
  }

  const showBoardsHandler = (e) =>{
      e.preventDefault();
      setShowResults(false);
      setShowSearch(false);
      setShowBoards(true);
  }
    


    return (
    
        <div className="myjobsearch-container">
            <Nav  
                showSearch={showSearch}
                showResultsHandler={showResultsHandler}
                showResults={showResults}
                showSearchHandler={ showSearchHandler}
                showBoards={showBoards}
                showBoardsHandler={showBoardsHandler}/>

            {showSearch ? <SearchForm showResultsHandler={showResultsHandler}/> : null} 
            {showResults ? <SearchResults/>  : null} 
            {showBoards ? <MyJobBoards/> : null} 
                
        </div>
      
    )
}

export default MyJobSearch;