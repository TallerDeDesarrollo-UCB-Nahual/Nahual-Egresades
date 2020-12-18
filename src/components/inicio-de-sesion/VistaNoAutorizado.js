import React, { Component } from 'react'
import { Button, Grid, Divider, Segment, Icon} from 'semantic-ui-react';
import logo from '../../public/imagenes/people-heart.png';
import '../../public/stylesheets/NoAutorizado.css';
import BotonLogout from "./../inicio-de-sesion/BotonLogout";

const origenSolicitud = process.env.REACT_APP_ORIGEN_SOLICITUD;
const solicitudAccesoNahual = process.env.REACT_APP_SOLICITUD_ACCESO_NAHUAL;
const clave = process.env.REACT_APP_CLAVE;

export class VistaNoAutorizado extends Component {

    usuario = null;
    constructor(props) {
        super(props);
        this.state = {
            usuario: null
        }
    }

    componentDidUpdate() {
        var datos = this.props.datosUsuario;
        this.recibirDatos(datos);
    }

    recibirDatos(datos) {
        this.usuario = datos
    }

    generarDatosDeSolicitud(datos) {
        var datosUsuario = JSON.parse(datos);
        const datosEnvio = {
            nombre: datosUsuario.nombre,
            correo: datosUsuario.email,
            origen: datosUsuario.aplicacion,
            redirigir: origenSolicitud
        }

        var AES = require('crypto-js/aes');
        let encriptado = AES.encrypt(JSON.stringify(datosEnvio), clave);
        let urlSolicitud = new URL(solicitudAccesoNahual);
        let parametros = urlSolicitud.searchParams;
        parametros.set('datos', encriptado.toString());
        urlSolicitud.search = parametros.toString();
        window.location.assign(urlSolicitud);
    }

    render() {
        return (
            <div>
                <div className="logoNoAutorizado">
                    <img src={logo} style={{ width: '300px', height: '300px' }}></img>
                    <h1>Lo sentimos, parece que no tienes acceso</h1>
                </div>
                <Segment placeholder>
                    <Grid columns={2} relaxed='very' stackable>
                        <Grid.Column className="centrar" verticalAlign='middle'>
                            <Icon name="sign out" size="huge" />
                            <h2>Volver al menú principal</h2>
                            <BotonLogout />
                        </Grid.Column>

                        <Grid.Column className="centrar">
                            <Icon name="unlock" size="huge"/>
                            <h2>Puedes solicitar acceso</h2>
                            <Button className="acceso" onClick={() => { this.generarDatosDeSolicitud(this.props.datosUsuario) }}>Solicitar Acceso</Button>
                        </Grid.Column>
                    </Grid>

                    <Divider vertical>Ó</Divider>
                </Segment>
            </div>
        )
    }
}
export default VistaNoAutorizado
