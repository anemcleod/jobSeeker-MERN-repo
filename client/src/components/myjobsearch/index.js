import React, {useContext, useState, useEffect} from 'react';

import JobServices from '../../services/jobServices';
import {AuthContext} from '../../context/AuthContext';


import SearchForm from '../searchForm';
import MyJobBoards from './myJobBoards';
import SearchResults from './searchResults';
import Nav from '.nav';

const MyJobSearch = () => {
    const [myJobBoards, setMyJobBoards] = useState(null);
    
    

    useEffect(()=>{
      JobServices.populate().then(data => {
        if(data){
          setMyJobBoards(data.jobBoards)
        }
      });
    }, []);

  

    


    return (
    
        <div className="myjobsearch-container">
            <Nav/>
            <SearchForm />
            <MyJobBoards/>
            <SearchResults/>       
        </div>
      
    )
}

export default MyJobSearch;