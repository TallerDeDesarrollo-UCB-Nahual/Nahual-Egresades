import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/lista-egresades/Navbar';
import EditarEgresades from './components/egresade/editar-egresades/EditarEgresades.js'; 
import EncabezadoDeRegistrar from './components/egresade/editar-egresades/EncabezadoDeRegistrar.js';
import Nahual_Table from './components/lista-egresades/Tabla';
import InicioSesion from "./components/inicio-de-sesion/InicioSesion";

function App() {
  return (
    <div>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={InicioSesion} />
            <Route path="/listaEgresades" component={Nahual_Table} />
          <Route exact path="/editar/:id" render={ (props) =>(
            <React.Fragment>   
            <EncabezadoDeRegistrar/> 
            <EditarEgresades {...props} />
            </React.Fragment>
          )}/>
        </Switch>
      </div>
  );
}

export default App;
