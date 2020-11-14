import React, { Component } from "react";
import { Segment } from 'semantic-ui-react'
import logo from '../../public/imagenes/waving_people.png';
class InicioSesion extends Component {

  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15vh' }}>
          <h1>NAHUAL</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px' }}>
          <img src={logo} style={{ width: '450px', height: '250px' }}></img>
        </div>
        <Segment placeholder>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
            <h2>Bienvenido a la página de Inicio de Nahual Egresades</h2>
          </div>
        </Segment>
      </div>
    );
  };
}
export default InicioSesion;
