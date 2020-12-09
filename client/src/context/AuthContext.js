import React, {createContext, useState, useEffect} from 'react';
import AuthServices from '../services/authServices';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchResults, setSearchResults] = useState(null)

    useEffect(() => {
        AuthServices.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        })
    }, []);

    return (
        <div>
            <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated, isLoaded, searchResults, setSearchResults }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}