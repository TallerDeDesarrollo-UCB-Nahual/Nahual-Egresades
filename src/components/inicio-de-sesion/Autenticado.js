import Axios from "axios";
import React, { Component } from "react";
import VistaNoAutorizado from './VistaNoAutorizado.js';
import { Auth0Context } from "@auth0/auth0-react";
import { Dimmer, Loader } from "semantic-ui-react";
import{Redirect} from "react-router-dom";

class Autenticado extends Component {
static contextType = Auth0Context;
  constructor(props) {
    super(props);
    this.state = {
      validado: false,
      datosRecuperados: null,
      mostrarBotonDeCarga: true
    };
  }

  componentWillMount() {
    this.obtenerDatosVerificados()
  }
  async obtenerDatosVerificados() {
    const SERVICIO_DE_VERIFICACION_API_NAHUAL =`${process.env.REACT_APP_AUTENTICACION_NAHUAL_API}`;
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
        this.setState({
          mostrarBotonDeCarga: false,
        });
        alert("Problemas en la solicitud, status: " + error.status);
      });
  }
  
  iconoDeCarga() {
    return (
      this.state.mostrarBotonDeCarga === true && (
        <Dimmer active inverted blurring>
          <Loader inverted>Verificando Acceso... Espere por favor</Loader>
        </Dimmer>
      )
    );
  }

  render() {
    return (
      <>
        {this.iconoDeCarga()}
        {(this.state.validado === true) && <Redirect to="/"/>}
        {(this.state.validado === false) && <React.StrictMode><VistaNoAutorizado datosUsuario={this.state.datosRecuperados}/></React.StrictMode>}
      </>
    );
  }
}

export default Autenticado;
