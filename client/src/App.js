import React, {useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import './assets/style.sass';

import {AuthContext} from './context/AuthContext';

import Home from './components/home/home';
import Login from './components/home/login';
import Navbar from './components/header/navbar'
import MyJobSearch from './components/myjobsearch/index';
import Loading from './components/header/loading';


const App = () => {
  const {isLoaded, isAuthenticated} = useContext(AuthContext);

  return (
      <Router>
        { isAuthenticated ? <Navbar/> : null }

        {isLoaded.loading ? <Loading /> : null}

        <Route exact path="/"> 
          { isAuthenticated ? <Home /> : <Login/>}
        </Route>
        
        <Route exact path="/myjobsearch"> 
          { isAuthenticated ? <MyJobSearch /> : <Redirect to="/" />}
        </Route>
      </Router>
  )
};

export default App;
