import React, {useState, useContext} from 'react';
import SearchServices from '../services/searchServices';
import {AuthContext} from '../context/AuthContext';
import { withRouter } from 'react-router-dom';


const SearchForm = (props) => {
    const [searchParams, setSearchParams] = useState({keywords: '', location:''});
    const {setIsLoaded, setSearchResults} = useContext(AuthContext);
    
    const onChangeHandler = e => {
        setSearchParams({...searchParams, [e.target.name] : e.target.value});
    }


    const submitHandler = e => {
        e.preventDefault();
        setSearchResults(null);
        setIsLoaded({loading : true, loaded: false, message: 'searching for jobs'})
        SearchServices.search(searchParams).then(data => {
            setIsLoaded({loading : false, loaded:true, message: ''})
            if(data){
                const {results} = data
                setSearchResults(results);
            }
        })
        if(props.location.pathname === "/"){
           props.history.push("/myjobsearch");
        }

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

            <input type="text" 
                   name="location"  
                   placeholder="city or state" 
                   className="input-basic drop-shadow"
                   onChange={onChangeHandler}/>

            <button onClick={submitHandler} 
                    type="submit" 
                    className="btn-basic drop-shadow">
                    search
            </button>
        </form>

    )
}

export default withRouter(SearchForm);