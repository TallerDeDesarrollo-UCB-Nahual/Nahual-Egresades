import React, { Component } from 'react';
import logo from '../../public/images/logo.png';
import '../../public/stylesheets/Navbar.css';

export default class Navbar extends Component {

    render() {
        return (
        <div className="menu">
            <img src={logo} className="logo"></img>
            <label className="nav-titulo">Gestor de Egresades</label>
        </div>
        )
    }
}