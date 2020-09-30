import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/lista-egresades/Navbar';
import RegistrarEgresades from './components/registrar-egresades/RegistrarEgresades.js'; 
import EncabezadoDeRegistrar from './components/registrar-egresades/EncabezadoDeRegistrar.js';
import Nahual_Table from './components/lista-egresades/Table';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Nahual_Table} />
        <Route exact path="/editar/:id" render={ (props) =>(
          <React.Fragment>   
          <EncabezadoDeRegistrar/> 
          <RegistrarEgresades {...props} />
          </React.Fragment>
        )}/>
      </Switch>
    </Router>
  );
}

export default App;
