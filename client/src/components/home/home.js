import React, {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import SearchForm from '../searchForm';




const Home = () => {
    const {user} = useContext(AuthContext);
    
    return (
        <div className="home-container">
            <div className="form-container">
                <h1 className="greeting">{`Hi, ${user.displayName}`}</h1>
                <SearchForm/>
            </div>
        </div>
    )

}

export default Home;