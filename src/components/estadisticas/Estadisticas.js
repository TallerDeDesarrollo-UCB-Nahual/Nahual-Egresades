import React, { Component } from 'react'
import Nahual_Menu from '../Menu/Menu'
import Nahual_BarrasChart from './barras/BarrasChart'
import { Segment } from 'semantic-ui-react'
import '../../public/stylesheets/Estadisticas.css'
class Nahual_Estadisticas extends Component {

  render() {
    return (
      <div>
        <Nahual_Menu/>
        <div className='estadistica'>
          <p className="titulo" >Estadisticas de Egresades</p>
          <div className="linea"/>
          <div className='container'>
            <Segment>
              <Nahual_BarrasChart/>
            </Segment>
          </div>
        </div>
      </div>
    )
  }
}
export default Nahual_Estadisticas;
