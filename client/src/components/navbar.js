import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import Menu from './menu';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const {user} = useContext(AuthContext);
    const [menu, setMenu] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const menuToggler = () => {
        if(showDelete){
            setShowDelete(false);
        }
        setMenu(!menu);
        console.log(menu);
    }

    return (
        <div className="nav-container">
            <Link to='/'>
                <div className="logo-container">
                    <div className="circle">{user.initial}</div>
                    <img className="nav-logo-png" src="/jobseeker_green_logo.png" alt="logo"/> 
                </div>
            </Link>
            <button onClick={menuToggler} className="btn-menu"><div className="seeker-menu-icon "></div></button>
            <Menu menuToggler={menuToggler} 
                  menu={menu}
                  showDelete={showDelete}
                  setShowDelete={setShowDelete}
            />
        </div>
    )
}

export default Navbar;