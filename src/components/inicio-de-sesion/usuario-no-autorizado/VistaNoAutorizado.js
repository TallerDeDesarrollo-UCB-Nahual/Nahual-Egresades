import React, { Component } from 'react'
import {Button, Grid, Form, Divider, Segment } from 'semantic-ui-react';
import {useAuth0} from '@auth0/auth0-react';
import logo from '../../../public/imagenes/noAutorizado.png';
import '../../../public/stylesheets/NoAutorizado.css';

/*
const {user: usuarioSesion, logout: cerrarSesion} = useAuth0();
*/
const origenSolicitud = 'https://nahual-8298d.web.app/';
const solicitudAccesoNahual= 'https://nahual-admin.herokuapp.com/';
const clave = 'Nahual123';

function generarDatosDeSolicitud(){
    const datosEnvio = {
        nombre: 'Pedro',
        correo: 'pedro@gmail.com',
        origen: 'Egresades',
        redirigir: origenSolicitud
    }

    var AES = require('crypto-js/aes');
    let encriptado = AES.encrypt(JSON.stringify(datosEnvio), clave);
    let urlSolicitud = new URL(solicitudAccesoNahual);
    let parametros = urlSolicitud.searchParams;
    parametros.set('datos', encriptado.toString());
    urlSolicitud.search = parametros.toString();
    console.log(urlSolicitud.toString());
}

export class VistaNoAutorizado extends Component {
    constructor(props){
        super(props);
    }

    redireccionarSolicitudAcceso(){
        //window.location.assign(generarDatosDeSolicitud())
        generarDatosDeSolicitud();
    }

    render() {
        return (
            <div>
                <div className="logoNoAutorizado">
                    <img src={logo} style={{ width: '200px', height: '200px' }}></img>
                    <h1>No Pasaras!!!, hasta que pidas acceso</h1>
                </div>
                <Segment placeholder>
                    <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column className="centrar">
                        <h2>Puedes solicitar acceso</h2>
                        <Button className="acceso" onClick={this.redireccionarSolicitudAcceso}>Solicitar Acceso</Button>
                    </Grid.Column>

                    <Grid.Column className="centrar" verticalAlign='middle'>
                        <h2>Volver al menú principal</h2>
                        <Button color='red'>Cerrar Sesión</Button>
                    </Grid.Column>
                    </Grid>

                    <Divider vertical>Ó</Divider>
                </Segment>
            </div>
        )
    }
}

export default VistaNoAutorizado
