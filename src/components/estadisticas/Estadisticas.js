import React, { Component } from 'react'
import Nahual_Nav from '../Menu/Menu'
import {Bar} from 'react-chartjs-2'
import Nahual_BarrasChart from './barras/BarrasChart'
import { Label, Button, Message, Table, Search, Segment, Dropdown, Container } from 'semantic-ui-react'


class Nahual_Estadisticas extends Component {

  render() {
    return (
      <div  style={{ textAlign : "center"}}>
        <Nahual_Nav/>
        <p className="titulo" >Estadisticas de Egresades</p>
        <div className="linea"></div>
        
       <div style ={{width: '70%', height: '500px', display: 'inline-flex', background:'antiquewhite', alignItems: 'center', justifyContent:'center', marginTop:'20px'}}>
        <Segment>
          <Nahual_BarrasChart/>
        </Segment>
          
       </div>
        
      
      </div>)
  }

}
export default Nahual_Estadisticas;
