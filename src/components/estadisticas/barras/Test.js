import React, { Component } from 'react'
import Nahual_NavTest from '../../Menu/Menu'
import {Bar} from 'react-chartjs-2'

import { Label, Button, Message, Table, Search, Segment, Dropdown, Input } from 'semantic-ui-react'

const { REACT_APP_EGRESADES_NAHUAL_API }  = process.env;
class Nahual_Estadisticas extends Component {
  constructor() {
    super();
    this.state ={
      egresades : [],
      alumnes : '',
      abandonades: '',
      empleades: '',
      total:'',
      mensajeDeEstado: "",
      mostrarMensajeDeEstado: false,
      cargando: true
    }
    //this.obteniendoEgresades = this.obteniendoEgresades.bind()
    this.obtenerEgresades()

    this.calculandoAlumnes()
  }

   manejarProblemas = () => {
    this.setState({ mostrarMensajeDeEstado: false })
  }


  obteniendoEgresades (contador){
    console.log("BBBBBBBBBBBBBBBBBBB")
    if (contador > 0) {
      this.setState({
        mensajeDeEstado: "Se realizo el registro de " + contador + " egresados exitosamente.",
        mostrarMensajeDeEstado: true
      });
    }
    this.obtenerEgresades();
  }

  obtenerEgresades() {
    console.log("ZZZZZZZZZZZZZZZZZZZZZ")
    fetch(`${REACT_APP_EGRESADES_NAHUAL_API}/egresades/DTO`)
      .then(res => res.json())
      .then(
        (result) => {
        this.setState({
          egresades: result.response,
          cargando: false
        });
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
     
  }

  calculandoAlumnes(){
    console.log("ESTOY AQUI")
    let cantidad = this.state.egresades.length
    console.log(cantidad)
  
    this.setState({
      alumnes:cantidad
      
    },()=>{})
  }

  calculandoAbandonados(){
    console.log("ESTOY Alla")
    let cantidad = this.state.egresades.length
    console.log(cantidad)
  
    this.setState({
      alumnes:cantidad
      
    },()=>{})
  }




  render() {
    return (
      <div>
        <React.Fragment>
                <Nahual_NavTest/>
            </React.Fragment>
            <div className="linea"></div>
          <div>
            {this.state.mostrarMensajeDeEstado ?
              <Message
                positive
                onDismiss={this.manejarProblemas}
                header='Registro exitoso!'
                content={this.state.mensajeDeEstado}
              ></Message>
              :
              <p></p>
            }
          </div>
          <p className="titulo" style={{  textAlign : "center"}} >Estadisticas de Egresades</p>

          <p >ESTADISTICAS AMIGOS</p>
          <div>
            <Search
              showNoResults={false}
      
              onSearchChange={this.calculandoAlumnes.bind(this),
              this.calculandoAbandonados.bind(this)}
              style={{ width: "auto" }}
            >
            </Search>
            </div> <br></br><br></br>
          

            <div> {this.state.egresades.length}</div> 
    
            <div> {this.state.alumnes}</div> 
            <div> {this.state.alumnes}</div> 

            <Bar 
              data={{
                labels:['Red','Egresades','Yellow','Green','Purple','Orange'],
                datasets:[
                  {
                    label:'# Amigos',
                    data: [12, this.state.egresades.length, 3, 5,1, 3],
                }]
                
              }}
              height ={400}
              width ={600}
              options = {{
              maintainAspectRatio: false,
            }}>
                
        
            </Bar>



      </div>)
  }

}
export default Nahual_Estadisticas;
