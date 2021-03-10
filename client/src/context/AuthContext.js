import React, {createContext, useState, useEffect} from 'react';

import AuthServices from '../services/authServices';
import JobServices from '../services/jobServices';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState({loading: false, loaded: false, message: ''});
    const [searchResults, setSearchResults] = useState(null)
    const [myJobBoards, setMyJobBoards] = useState(null);
    const [deleteJob, setDeleteJob] = useState({
                                                    showDeleteJob: false,
                                                    selectedJob: "",
                                                    boardId: ""
                                                })  
    const [pinJob, setPinJob] = useState({
                                            showPinJob: false,
                                            selectedJob: null
                                        })  

    // Load user data on mount
    useEffect(() => {
        setIsLoaded({loading : true, loaded: false, message: ''})
        AuthServices.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            if(isAuthenticated) {
               JobServices.populate().then(data => {
                    if(data) {
                    setMyJobBoards(data.jobBoards)
                    }
                });
            }
            setIsLoaded({loading: false, loaded: true, message: ''});
        })
    }, []);


    useEffect(() => { 
        JobServices.populate().then(data => {
            if(data) {
            setMyJobBoards(data.jobBoards)
            }
        });
 
    }, [isAuthenticated]);

    // global functions
    const addBoard = (e) =>{
        if(e) {
            e.preventDefault();
        }
        JobServices.createJobBoard({title: "Job Board"}).then(data => {
            if(data.message.msgError){
                 alert(data.message.msgBody);
                 return
            }
            if(data) {
                setMyJobBoards(prevState => {
                  let copy = [...prevState]
                  copy.push({
                    _id: data.id,
                    title: "Job Board",
                    jobs: []
                  });
                    return copy;
                });
            }
      });
    }

    return (
        <div>
            <AuthContext.Provider value={{
                                            user, 
                                            setUser, 
                                            isAuthenticated, 
                                            setIsAuthenticated, 
                                            isLoaded, 
                                            setIsLoaded, 
                                            searchResults, 
                                            setSearchResults, 
                                            myJobBoards, 
                                            setMyJobBoards,
                                            deleteJob, 
                                            setDeleteJob,
                                            pinJob, 
                                            setPinJob,
                                            addBoard
                                        }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}