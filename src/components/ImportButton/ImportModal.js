import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { CSVReader } from 'react-papaparse'
import { Button, Modal } from 'semantic-ui-react'
import LoadedList from './LoadedList';

const publicarListaDeEgresades_URL = 'https://mighty-anchorage-20911.herokuapp.com/api/graduates'

class ImportModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      abierto: false,
      mostrarLista: false,
      egresades: [],
      contadorEgresades: 0 
    };
    this.mostrarTabla = this.mostrarTabla.bind(this);
    this.setAbierto = this.setAbierto.bind(this);
  }
  mostrarTabla = (data)=> {
    this.setState({
      mostrarLista: true,
    });
  }

  setAbierto = (state)=> {
    this.setState({	    
      abierto:state,
      mostrarLista:false,
      egresades:[],
      contadorEgresades:0
    });	 
  }	  

  onSubmit=(onRegistrarCorrectamente)=>{
    let lista = this.state.egresades
    console.log(JSON.stringify(lista))
    fetch(publicarListaDeEgresades_URL,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify(lista).length.toString()
      },
      body:JSON.stringify(lista)
    }).then(res=>{
      console.log(res)
      if(res){
        onRegistrarCorrectamente(this.state.contadorEgresades)
        this.setAbierto(false)
        console.log(res)
      }
    })
    .catch(err =>{
      console.log("error al leer los datos "  + err)
    })
  }


  handleOnDrop = (data) => {
    data.forEach(fila => {
      var egresade = {
        "fullName": fila.data["Nombre y apellido"],
        "statusName": "Egresade",
        "birthDate": fila.data["Fecha de Nacimiento"],
        "mail": fila.data["Mail"],
        "cellphone": fila.data["Numero de Celular"],
        "nodeName": fila.data["NODO"],
        "graduationYear": fila.data["Año"],
        "quarter": fila.data["Cuatri"],
        "englishLevel": fila.data["Ingles"],
        "firstJobName": fila.data["Empresa IT primer empleo"],
        "linkedin": fila.data["Linkedin"],
        "isEmployed": fila.data["Consiguió trabajo luego de egresar?"]==="Sí" || fila.data["Consiguió trabajo luego de egresar?"]==="Si"?true:false,
        "module": fila.data["Tipo de curso del cual egresó"]
      }
      this.state.egresades.push(egresade)
      this.incrementarContadorEgresades()
    });
    this.mostrarTabla()
  }

  incrementarContadorEgresades () {
    this.setState({contadorEgresades: this.state.contadorEgresades + 1})
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    this.setState({mostrarLista:false, egresades:[]});
  }
  setAbierto(state) {
    this.setState({
      abierto:state,
      mostrarLista:false,
      egresades:[],
      contadorEgresades:0
    });
  }
  
  render(){
          return (
            <div><Modal
              centered={true}
              open={this.state.abierto}
              onClose={()=>this.setAbierto(false)}
              onOpen={()=>this.setAbierto(true)}
              trigger={<Button color="green"><i className='white upload icon'/>Importar</Button>}>
              
              <Modal.Header>Importar</Modal.Header>
              <Modal.Content color="white">
                <Modal.Description>
                <CSVReader
                  config = {{
                    header:true,
                    skipEmptyLines:true
                  }}
                  onDrop={this.handleOnDrop}
                  onError={this.handleOnError}
                  addRemoveButton
                  onRemoveFile={this.handleOnRemoveFile}>
                  <span>Drop CSV file here or click to upload.</span>
                </CSVReader>
                </Modal.Description>
              </Modal.Content>  
              <Modal.Actions>
                {this.state.mostrarLista && this.state.egresades !== [] ? 
                  <LoadedList json = {this.state.egresades}/>
                  :
                  <h1 align="center">No se cargo ningun archivo</h1>}
                <Button color="green" onClick={()=>this.onSubmit(this.props.onClick)}>Ok</Button>
                <Button color="red" onClick={()=>this.setAbierto(false)}>Cancel</Button>               
              </Modal.Actions>
            </Modal>
            </div>
          )}
}
export default ImportModal;