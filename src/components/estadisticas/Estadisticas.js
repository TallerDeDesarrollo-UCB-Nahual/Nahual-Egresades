import React, { Component } from 'react'
import Nahual_Nav from '../Menu/Menu'
import {Bar} from 'react-chartjs-2'
import Nahual_BarrasChart from './barras/BarrasChart'
import { Label, Button, Message, Table, Search, Segment, Dropdown, Container } from 'semantic-ui-react'


class Nahual_Estadisticas extends Component {

  render() {
    return (
      <div>
        <Nahual_Nav/>
        <p className="titulo" style={{ textAlign : "center"}} >Estadisticas de Egresades</p>
        <div className="linea"></div>
        <Nahual_BarrasChart/>
      </div>)
  }

}
export default Nahual_Estadisticas;
