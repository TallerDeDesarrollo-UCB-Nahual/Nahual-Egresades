import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { CSVReader } from 'react-papaparse'
import { Button, Modal } from 'semantic-ui-react'
import LoadedList from './LoadedList';
import axios  from 'axios';

const studentsURL = 'https://mighty-anchorage-20911.herokuapp.com/api/graduates'

class ImportModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isLoading: true,
      showComponent: false,
      graduates: [],
      graduatesCount: 0 
    };
    this.showTable = this.showTable.bind(this);
    this.setOpen = this.setOpen.bind(this);
  }
  showTable = (data)=> {
    this.setState({
      showComponent: true,
    });
  }

  onSubmit(successfulRegistration){
    let lista = this.state.graduates
    console.log(JSON.stringify(lista))
    fetch(studentsURL,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify(lista).length.toString(),
        'Host':'localhost:443'
      },
      body:JSON.stringify(lista)
    }).then(res=>{
      console.log(res)
      if(res){
        console.log(res)
      }
    })
    .catch(err =>{
      console.log("error reading data "+err)
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
      this.addCount()
    });
    this.showTable()
  }

  addCount () {
    this.setState({graduatesCount: this.state.graduatesCount + 1})
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    this.setState({showComponent:false, graduates:[]});
  }
  setOpen(state) {
    this.setState({
      open:state,
      showComponent:false,
      graduates:[],
      graduatesCount:0
    });
  }
  
  render(){
          return (
            <div><Modal
              centered={true}
              open={this.state.open}
              onClose={()=>this.setOpen(false)}
              onOpen={()=>this.setOpen(true)}
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
                {this.state.showComponent && this.state.graduates !== [] ? 
                  <LoadedList json = {this.state.graduates}/>
                  :
                  <h1 align="center">No se cargo ningun archivo</h1>}
                <Button color="green" onClick={this.onClickConfirmButton()}>Ok</Button>
                <Button color="red" onClick={()=>this.setOpen(false)}>Cancel</Button>               
              </Modal.Actions>
            </Modal>
            </div>
          )}
}
export default ImportModal;