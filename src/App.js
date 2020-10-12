import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/lista-egresades/Navbar';
import EditarEgresades from './components/registrar-egresades/EditarEgresades.js'; 
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
          <EditarEgresades {...props} />
          </React.Fragment>
        )}/>
      </Switch>
    </Router>
  );
}

export default App;
