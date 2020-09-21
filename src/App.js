import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/lista-egresades/Navbar';
import Nahual_Table from './components/lista-egresades/Table';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Nahual_Table} />
      </Switch>
    </Router>
  );
}

export default App;
