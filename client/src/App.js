import React, {useContext} from 'react';
import {AuthContext} from './context/AuthContext';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Navbar from './components/navbar'
import MyJobSearch from './components/myjobsearch';
import './style.sass';


const App = () => {
  const {isAuthenticated} = useContext(AuthContext);
  return (
    <Router>
      { isAuthenticated ? <Navbar/> : null }
      <Route exact path="/" component={isAuthenticated ? Home : Login}/>
      <Route exact path="/myjobsearch" component={ MyJobSearch}/>
    </Router>
  )
};

export default App;
