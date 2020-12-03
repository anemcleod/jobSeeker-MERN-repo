import React, {useContext} from 'react';
import {AuthContext} from './context/AuthContext';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Navbar from './components/navbar'
import './style.sass';


function App() {
  const {isAuthenticated} = useContext(AuthContext);
  return (
    <Router>
      { isAuthenticated ? <Navbar/> : null }
      <Route exact path="/" component={isAuthenticated ? Home : Login}/>
    </Router>
  )
}

export default App;
