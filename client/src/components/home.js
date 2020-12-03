import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';



const Home = () => {
    const {isAuthenticated, user} = useContext(AuthContext);
    
    return (
        <div>home</div>
    )

}

export default Home;