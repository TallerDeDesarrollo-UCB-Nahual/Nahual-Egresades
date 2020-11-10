import Axios from "axios";
import React, { Component } from "react";
import Nahual_Table from "../lista-egresades/Tabla";
import VistaNoAutorizado from './VistaNoAutorizado.js';
import { Auth0Context } from "@auth0/auth0-react";
import { Dimmer, Loader } from "semantic-ui-react";

class Autenticado extends Component {
static contextType = Auth0Context;
  constructor(props) {
    super(props);
    this.state = {
      validado: false,
      mostrarBotonDeCarga: true,
      datosRecuperados: null
    };
  }

  componentWillMount() {
    this.obtenerVerificacion()
  }
  errorDeCaptura(error) {
    this.setState({
      mostrarBotonDeCarga: false
    });
    alert("Hay un error en la base de datos, status: " + error.status);
  }
  
  obtenerVerificacion() {
    const SERVICIO_DE_VERIFICACION_API_NAHUAL ="https://nahual-authentication-api.herokuapp.com/api/";
    const { user: usuario } = this.context;
    const datos = JSON.stringify({
      nombre: usuario.name,
      email: usuario.email,
      aplicacion: "Egresades"
    });
    Axios({
      key: "apiData",
      method: "post",
      url: `${SERVICIO_DE_VERIFICACION_API_NAHUAL}/verificarAcceso`,
      headers: { "Content-Type": "application/json" },
      data: datos
    })
      .then((respuesta) => {
        this.setState({
          validado: respuesta.data.data,
          mostrarBotonDeCarga: false,
          datosRecuperados: datos
        });
      })
      .catch((error) => {
        this.errorDeCaptura(error);
      });
  }
  iconoDeCarga() {
    return (
      this.state.mostrarBotonDeCarga === true && (
        <Dimmer active inverted>
          <Loader inverted>Verificando Acceso...</Loader>
        </Dimmer>
      )
    );
  }
  render() {
    return (
      <>
        {this.iconoDeCarga()}
        {this.state.validado ? <Nahual_Table /> : <VistaNoAutorizado datosUsuario={this.state.datosRecuperados}/>}
      </>
    );
  }
}

export default Autenticado;
