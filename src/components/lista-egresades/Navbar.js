import React, { Component } from 'react';
import logo from '../../public/imagenes/logo.png';
import '../../public/stylesheets/Navbar.css';
import BarraNavegacionAutenticacion from "./../inicio-de-sesion/BarraNavegacionAutenticacion";

export default class Navbar extends Component {

    render() {
        return (
            <div className="menu">
                <img src={logo} className="logo"></img>
                <label className="nav-titulo">Gestor de Egresades</label>
                <div className="authNav"><BarraNavegacionAutenticacion /></div>
            </div>
        )
    }
}