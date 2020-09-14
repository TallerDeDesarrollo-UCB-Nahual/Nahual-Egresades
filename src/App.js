import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './lista-egresades/Navbar';
import Nahual_Table from './lista-egresades/Table';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Navbar} />
        <Route exact path="/table" component={Nahual_Table} />
      </Switch>
    </Router>
  );
}

export default App;
