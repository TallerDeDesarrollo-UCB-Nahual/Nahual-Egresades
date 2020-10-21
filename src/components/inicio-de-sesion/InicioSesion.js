import React, { Component } from "react";
import logo from '../../public/images/logo.png';
class InicioSesion extends Component {

  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
          <h1>NAHUAL</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px' }}>
          <img src={logo} style={{ width: '300px', height: '300px' }}></img>
        </div>
      </div>
    );
  };
}
export default InicioSesion;
