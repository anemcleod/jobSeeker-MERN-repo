import React, {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import AuthServices from '../../services/authServices';
import {Link} from 'react-router-dom';



const Menu = ({menu, menuToggler, showDelete, setShowDelete}) => {
    const {setIsLoaded, setUser, setIsAuthenticated} = useContext(AuthContext);
    
    const revealDelete = () => {
        setShowDelete(!showDelete);
    }
    const logoutHandler = (e) => {
        e.preventDefault();
        setIsLoaded({loading : true, loaded:false, message: 'Logging Out'})
        AuthServices.logout().then(data => {
            setIsLoaded({loading : false, loaded:true, message: ''});
            if(data.success){
                setUser(data.user);;
                setIsAuthenticated(false)
            }
        });
    }
    const deleteAccount = (e) => {
        e.preventDefault();
            AuthServices.deleteUser().then(data =>{
            if(!data.message.msgError){
                
                setTimeout(() => {
                    setUser(data.user);
                    setIsAuthenticated(false);
                }, 2000)
                
            }
        })
    }

    return (
        <div className={menu ? "menu-container menu-container-expand" : "menu-container"}>
             <button onClick={menuToggler} className="btn-menu"><div className="seeker-exit-icon "></div></button>
             <div className="menu-btn-container">
                <Link to='/'><button onClick={menuToggler} className="btn-basic btn-menu-options">home</button></Link>
                <Link to='/myjobsearch'><button onClick={menuToggler} className="btn-basic btn-menu-options">my job search</button></Link>
                <button className="btn-basic btn-menu-options" onClick={logoutHandler}>logout</button>
                <button onClick={revealDelete} className={showDelete ? "btn-basic btn-menu-options btn-danger btn-danger-active" : "btn-basic btn-menu-options btn-danger"}>danger</button>
                { showDelete ? <button onClick={deleteAccount} className="btn-basic btn-menu-options btn-danger-active">delete account</button>
                : null}
                
             </div>
        </div>
    )

}

export default Menu;