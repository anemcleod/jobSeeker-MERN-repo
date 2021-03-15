import React, {useState, useContext} from 'react';
import { withRouter } from 'react-router-dom';

import SearchServices from '../services/searchServices';
import {AuthContext} from '../context/AuthContext';
import quotes from '../context/inspiration';

const SearchForm = (props) => {
    const [searchParams, setSearchParams] = useState({keywords: '', location:''});
    const {setIsLoaded, setSearchResults} = useContext(AuthContext);
    
    let quote = quotes[Math.floor(quotes.length*Math.random())];

    const onChangeHandler = e => {
        setSearchParams({...searchParams, [e.target.name] : e.target.value});
    }

    //submit search request
    const submitHandler = e => {
        e.preventDefault();

        //clear out previous search results
        setSearchResults(null);

        setIsLoaded({loading : true, loaded: false, message: quote})
        
        //request data from Adzuna api via app's server
        SearchServices.search(searchParams).then(data => {
            setIsLoaded({loading : false, loaded:true, message: ''})
            if(data.message){
                alert(data.message.msgBody);
                return
            }
            if(data){
                const {results} = data
                setSearchResults(results);
            }
        });

        //if homepage go to myjobsearch page
        if(props.location.pathname === "/"){
           props.history.push("/myjobsearch");
        }

        //toggle to search results on myjobsearch page
        if(props.location.pathname === "/myjobsearch"){
            props.showResultsHandler();
         }
       
    }

    return (
        <form action="" className="search-form-main">
            <input 
                type="text" 
                name="keywords"  
                placeholder="job title, keywords" 
                className="input-basic drop-shadow"
                onChange={onChangeHandler}/>

            <input 
                type="text" 
                name="location"  
                placeholder="city or state" 
                className="input-basic drop-shadow"
                onChange={onChangeHandler}/>

            <button 
                onClick={submitHandler} 
                type="submit" 
                className="btn-basic drop-shadow">
                search
            </button>
        </form>

    )
}

export default withRouter(SearchForm);