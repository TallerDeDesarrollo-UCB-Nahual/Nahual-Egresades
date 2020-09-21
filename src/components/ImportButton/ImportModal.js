import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { CSVReader } from 'react-papaparse'
import { Button, Modal } from 'semantic-ui-react'
import LoadedList from './LoadedList';

class ImportModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showComponent: false,
      egresados: [],
      egresadosCount: 0
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }
  _onButtonClick = (data)=> {
    this.setState({
      showComponent: true,
    });
  }
  handleOnDrop = (data) => {
    data.forEach(row => {
      //this.state.egresadosCount += 1
      var aux = {
        "fullName": row.data["Nombre y apellido"],
        "statusName": "Egresade",
        "birthDate": row.data["Fecha de Nacimiento"],
        "mail": row.data["Mail"],
        "cellphone": row.data["Numero de Celular"],
        "nodeName": row.data["NODO"],
        "graduationYear": row.data["Año"],
        "quarter": row.data["Cuatri"],
        "englishLevel": row.data["Ingles"],
        "firstJobName": row.data["Empresa IT primer empleo"],
        "linkedin": row.data["Linkedin"],
        "isEmployed": row.data["Consiguió trabajo luego de egresar?"]==="Sí" || row.data["Consiguió trabajo luego de egresar?"]==="Si"?true:false,
        "module": row.data["Tipo de curso del cual egresó"]
      }
      this.state.egresados.push(aux)
    });
    console.log(this.state.egresados)
    this._onButtonClick()
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    this.setState({showComponent:false, egresados:[]});
    console.log(data)
    console.log('---------------------------')
  }
  

  render(){
          return (
            <Modal
              centered={true}
              open={this.open}
              onClose={()=>this.setState({open:false})}
              onOpen={()=>this.setState({open:true})}
              trigger={<Button color="green">Importar</Button>}>
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
                {this.state.showComponent && this.state.egresados !== [] ? 
                  <LoadedList json = {this.state.egresados}/>
                  :
                  <h1 align="center">No se cargo ningun archivo</h1>}
                <Button color="green">Ok</Button>
                <Button color="red" onClick={this.onClose}>Cancel</Button>
                
                
              </Modal.Actions>
            </Modal>
          )}
}
export default ImportModal;
