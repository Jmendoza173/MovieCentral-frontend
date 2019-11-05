import React from 'react';
import Routes from './Routes'
import Nav from './Components/Nav'
import {BrowserRouter as Router} from 'react-router-dom'
import Search from './Components/Search';
import "./App.css"


const App = () => {

  return (
    <Router>
      <Nav />
      <Search />
      <Routes />
    </Router>

  );
}

export default App;
