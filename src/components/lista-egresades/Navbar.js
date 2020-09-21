import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import logo from '../../public/images/logo.png';
import '../../public/stylesheets/Navbar.css';

export default class Navbar extends Component {

    hola(){
        console.log("hola")
    }

    render() {
        return (
        <div className="menu">
            <img src={logo} className="logo"></img>
            <label className="nav-title">Gestor de Egresades</label>
        </div>
        )
    }
}