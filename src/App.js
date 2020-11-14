import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/lista-egresades/Navbar';
import EditarEgresades from './components/egresade/editar-egresades/EditarEgresades.js'; 
import EncabezadoDeRegistrar from './components/egresade/editar-egresades/EncabezadoDeRegistrar.js';
import Nahual_Table from './components/lista-egresades/Tabla';
import InicioSesion from "./components/inicio-de-sesion/InicioSesion";
import Autenticado from "./components/inicio-de-sesion/Autenticado"
import { Container } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";
import RutaProtegida from "./components/inicio-de-sesion/RutaProtegida"
function App() {
  const { isAuthenticated: estaAutenticado } = useAuth0();

  return (
    <div>
        <Navbar/>
        <Container  style={{ minHeight: "60vh", marginTop: "115px" }} >
        {estaAutenticado ? <Autenticado /> : <InicioSesion />}
        </Container>
        <Switch>
            <RutaProtegida exact path="/listaEgresades" component={Nahual_Table}/>
            <RutaProtegida exact path="/editar/:id" render={ (props) =>(
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
