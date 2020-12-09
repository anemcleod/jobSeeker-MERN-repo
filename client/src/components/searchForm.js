import React, {useState, useContext} from 'react';
import SearchServices from '../services/searchServices';
import {AuthContext} from '../context/AuthContext';

const SearchForm = () => {
    const [searchParams, setSearchParams] = useState({keywords: '', location:''});
    const {searchResults, setSearchResults} = useContext(AuthContext);
    
    const onChangeHandler = e => {
        setSearchParams({...searchParams, [e.target.name] : e.target.value});
    }


    const submitHandler = e => {
        e.preventDefault();
        setSearchResults(null);
        SearchServices.search(searchParams).then(data => {
            if(data){
                const {results} = data
                setSearchResults(results);
            }
        })
        
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

export default SearchForm;