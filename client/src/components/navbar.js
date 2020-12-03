import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import AuthServices from '../services/authServices';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className="nav-container">
            <div>
                <div>icon</div>
                <div>jobseeker</div>  
            </div>
            <button>menu</button>
    </div>
    )
}

export default Navbar;