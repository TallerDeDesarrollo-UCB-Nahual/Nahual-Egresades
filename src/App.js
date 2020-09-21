import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/lista-egresades/Navbar';
import RegisterGraduates from './components/register-graduates/RegisterGraduates.js'; 
import RegistrationHeader from './components/register-graduates/RegistrationHeader.js';
import Nahual_Table from './components/lista-egresades/Table';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Nahual_Table} />
        <Route exact path="/registrar" render={ props =>(
          <React.Fragment>   
          <RegistrationHeader />
          <RegisterGraduates/>
          </React.Fragment>
        )}/>
      </Switch>
    </Router>
  );
}

export default App;
