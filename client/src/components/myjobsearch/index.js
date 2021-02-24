import React, {useState, useContext, useEffect} from 'react';

import {AuthContext} from '../../context/AuthContext';

import SearchForm from '../searchForm';
import SearchResults from './searchResults';
import Nav from './nav';
import MyJobBoards from './myJobBoards';
import PinJobMenu from './pinMenu';

const MyJobSearch = () => {
    
    const [showSearch, setShowSearch] = useState(false);
    const [showResults, setShowResults] = useState(true);
    const [showBoards, setShowBoards] = useState(false);
   
    const {myJobBoards, addBoard, pinJob} = useContext(AuthContext);

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
    
    useEffect(()=> {
        if(myJobBoards.length === 0){
            addBoard();
        }
    },[pinJob])

    if(myJobBoards) {
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
    return <div>loading</div>
}

export default MyJobSearch;