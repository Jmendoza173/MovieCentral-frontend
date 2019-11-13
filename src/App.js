import React from 'react';
import Routes from './Routes'
import Nav from './Components/Nav'
import {BrowserRouter as Router} from 'react-router-dom'
import "./App.css"


const App = () => {

  return (
    <Router>
      <Nav />
      <Routes />
    </Router>

  );
}

export default App;
