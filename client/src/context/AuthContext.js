import React, {createContext, useState, useEffect} from 'react';
import AuthServices from '../services/authServices';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState({loading: false, loaded: false, message: ''});
    const [searchResults, setSearchResults] = useState(null)
    const [userData, setUserData] = useState(false);

    useEffect(() => {
        setIsLoaded({loading : true, loaded: false, message: ''})
        AuthServices.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded({loading: false, loaded: true, message: ''});
        })
    }, [userData]);


    return (
        <div>
            <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated, isLoaded, setIsLoaded, searchResults, setSearchResults, userData, setUserData }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}