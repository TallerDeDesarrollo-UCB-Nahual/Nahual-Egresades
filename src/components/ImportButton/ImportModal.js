import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { CSVReader } from 'react-papaparse'
import { Button, Modal, Icon } from 'semantic-ui-react'
import LoadedList from './LoadedList';
const studentssURL = 'https://mighty-anchorage-20911.herokuapp.com/api/graduates'

class ImportModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showComponent: false,
      graduates: [],
      graduatesCount: 0 
    };
    this._onButtonClick = this._onButtonClick.bind(this);
    this.onClickConfirmButton = this.onClickConfirmButton.bind(this);
  }
  _onButtonClick = (data)=> {
    this.setState({
      showComponent: true,
    });
  }

  onClickConfirmButton = ()=>{
    let lista = this.state.graduates
    console.log(lista)
    fetch(studentssURL,{
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body:JSON.stringify(lista)
    }).then(r=>r.json()).then(res=>{
      if(res){
        console.log(res)
      }
    })
  }
  handleOnDrop = (data) => {
    data.forEach(row => {
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
      this.state.graduates.push(aux)
    });
    this._onButtonClick()
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    this.setState({showComponent:false, graduates:[]});
  }
  setOpen(state) {
    this.setState({
      open:state
    });
  }
  
  render(){
          return (
            <Modal
              centered={true}
              open={this.open}
              onClose={()=>this.setOpen(false)}
              onOpen={()=>this.setOpen(true)}
              trigger={<Button color="green"><Icon name='upload' color='white'/>Importar</Button>}>
              
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
                {this.state.showComponent && this.state.graduates !== [] ? 
                  <LoadedList json = {this.state.graduates}/>
                  :
                  <h1 align="center">No se cargo ningun archivo</h1>}
                <Button color="green" onClick={this.onClickConfirmButton()}>Ok</Button>
                <Button color="red" onClick={()=>this.setOpen(false)}>Cancel</Button>               
              </Modal.Actions>
            </Modal>
          )}
}
export default ImportModal;