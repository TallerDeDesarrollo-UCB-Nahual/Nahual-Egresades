import Axios from "axios";
import React, { Component } from "react";
import Nahual_Table from "../lista-egresades/Tabla";
import NoAutorizado from "./NoAutorizado";
import { Auth0Context } from "@auth0/auth0-react";
import { Dimmer, Loader } from "semantic-ui-react";

class Autenticado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validado: false,
      mostrarBotonDeCarga: true
    };
  }
  static contextType = Auth0Context;

  componentDidMount() {
    this.obtenerVerificacion();
  }
  errorDeCaptura(error) {
    this.setState({
      mostrarBotonDeCarga: false
    });
    alert("Hay un error en la base de datos, status: " + error.status);
  }
  async obtenerVerificacion() {
    const SERVICIO_DE_VERIFICACION_API_NAHUAL ="https://nahual-authentication-api.herokuapp.com/api/";
    const { user: usuario } = this.context;
    const datos = JSON.stringify({
      nombre: usuario.name,
      email: usuario.email,
      aplicacion: "Egresades"
    });
    console.log(datos)
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
          mostrarBotonDeCarga: false
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
      console.log(this.state.validado)
    return (
      <>
        {this.iconoDeCarga()}
        {this.state.validado ? <Nahual_Table /> : <NoAutorizado />}
      </>
    );
  }
}

export default Autenticado;
