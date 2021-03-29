import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/lista-egresades/Navbar';
import EditarEgresades from './components/egresade/editar-egresades/EditarEgresades.js'; 
import EncabezadoDeRegistrar from './components/egresade/editar-egresades/EncabezadoDeRegistrar.js';
import Nahual_Table from './components/lista-egresades/Tabla';
import Nahual_Estadisticas from './components/estadisticas/Estadisticas';
import InicioSesion from "./components/inicio-de-sesion/InicioSesion";
import Autenticado from "./components/inicio-de-sesion/Autenticado";
import GenerarCertificado from "./components/certificacion/GenerarCertificado"
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated: estaAutenticado } = useAuth0();

  return (
    <div>
      <Navbar/>
      {estaAutenticado ? <Autenticado /> : <InicioSesion />}
      <Switch>
        <Route exact path="/" component={Nahual_Table}/>
        <Route exact path="/listaEgresades" component={Nahual_Table}/>
        <Route exact path="/certificado/:id" component={GenerarCertificado}/>
        <Route exact path="/estadisticas" component={Nahual_Estadisticas}/>

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
