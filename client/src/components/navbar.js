import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

import { Link } from 'react-router-dom';


const Navbar = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className="nav-container">
            <Link to='/'>
                <div className="logo-container">
                    <div className="circle">{user.initial}</div>
                    <img className="nav-logo-png" src="/jobseeker_green_logo.png" alt="logo"/> 
                </div>
            </Link>
            <button className="btn-menu"><div className="seeker-menu-icon "></div></button>
    </div>
    )
}

export default Navbar;