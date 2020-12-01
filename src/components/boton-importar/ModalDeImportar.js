import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { CSVReader } from 'react-papaparse'
import { Button, Modal,Table } from 'semantic-ui-react'
import CargarLista from './CargarLista';


const publicarListaDeEgresades_URL = 'https://nahual-datos-estudiantes.herokuapp.com/api/egresades/'

class ModalDeImportar extends Component {
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
  mostrarTabla = (data) => {
    this.setState({
      mostrarLista: true,
    });
  }

  setAbierto = (state) => {
    this.setState({
      abierto: state,
      mostrarLista: false,
      egresades: [],
      contadorEgresades: 0
    });
  }

  onSubmit = (onRegistrarCorrectamente) => {
    let lista = this.state.egresades
    console.log(JSON.stringify(lista))
    fetch(publicarListaDeEgresades_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify(lista).length.toString()
      },
      body: JSON.stringify(lista)
    }).then(res => {
      if (res) {
        onRegistrarCorrectamente(this.state.contadorEgresades)
        this.setAbierto(false)
        console.log(res)
      }
    })
      .catch(err => {
        console.log("error al leer los datos " + err)
      })
  }
  handleOnDrop = (data) => {
    data.forEach(fila => {
      console.log(fila)
      var egresade = {
        "nombre": fila.data["Nombre"],
        "apellido": fila.data["Apellido"],
        "nombreEstado": "Egresade",
        "fechaNacimiento": fila.data["Fecha de Nacimiento"],
        "correo": fila.data["Mail"],
        "celular": fila.data["Numero de Celular"],
        "sede": fila.data["SEDE"],
        "nombreNodo": fila.data["NODO"],
        "añoGraduacion": fila.data["Año"],
        "cuatrimestre": fila.data["Cuatri"],
        "nivelIngles": fila.data["Ingles"],
        "nombrePrimerTrabajo": fila.data["Empresa IT primer empleo"],
        "linkedin": fila.data["Linkedin"],
        "esEmpleado": fila.data["Consiguió trabajo luego de egresar?"] === "Sí" || fila.data["Consiguió trabajo luego de egresar?"] === "Si" ? true : false,
        "modulo": fila.data["Tipo de curso del cual egresó"]
      }
      this.state.egresades.push(egresade)
      this.incrementarContadorEgresades()
    });
    this.mostrarTabla()
  }

  incrementarContadorEgresades() {
    this.setState({ contadorEgresades: this.state.contadorEgresades + 1 })
  }

  handleOnError = (err) => {
    console.log(err)
  }

  handleOnRemoveFile = () => {
    this.setState({ mostrarLista: false, egresades: [] });
  }
  setAbierto(state) {
    this.setState({
      abierto: state,
      mostrarLista: false,
      egresades: [],
      contadorEgresades: 0
    });
  }

  render() {
    return (
      <div>
        <Modal
        centered={true}
        open={this.state.abierto}
        onClose={() => this.setAbierto(false)}
        onOpen={() => this.setAbierto(true)}
        trigger={<Button color="green"><i className='white upload icon' />Importar</Button>}>

        <Modal.Header>Importar</Modal.Header>
        <Modal.Content color="white">
          <Modal.Description>
            <CSVReader
              config={{
                header: true,
                skipEmptyLines: 'greedy'
              }}
              onDrop={this.handleOnDrop}
              onError={this.handleOnError}
              addRemoveButton
              onRemoveFile={this.handleOnRemoveFile}>
              <span>Drop CSV file here to upload.</span>
            </CSVReader>
          </Modal.Description>
        </Modal.Content>
        <h4>Nombres de headers del archivo .csv para la carga</h4>
        <Table celled>   
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Apellido</Table.HeaderCell>
            <Table.HeaderCell>Fecha de Nacimiento</Table.HeaderCell>
            <Table.HeaderCell>Mail</Table.HeaderCell>
            <Table.HeaderCell>Numero de Celular</Table.HeaderCell>
            <Table.HeaderCell>NODO</Table.HeaderCell>
            <Table.HeaderCell>SEDE</Table.HeaderCell>
            <Table.HeaderCell>Año</Table.HeaderCell>
            
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Cuatri</Table.HeaderCell>
            <Table.HeaderCell>Tipo de curso del cual egresó</Table.HeaderCell>
            <Table.HeaderCell>Profesor referente</Table.HeaderCell>
            <Table.HeaderCell>Ingles</Table.HeaderCell>
            <Table.HeaderCell>Linkedin</Table.HeaderCell>
            <Table.HeaderCell>Consiguió trabajo luego de egresar?</Table.HeaderCell>
            <Table.HeaderCell>Empresa IT primer empleo</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
        <Modal.Actions>
          {this.state.mostrarLista && this.state.egresades !== [] ?
            <CargarLista json={this.state.egresades} />
            :
            <h1 align="center">No se cargo ningun archivo</h1>}
          <button className="ui basic negative button" onClick={() => this.setAbierto(false)}>Cancelar</button>
          <button className="ui basic positive button" style={{ border: "rgb(129,206,50)" }} onClick={() => this.onSubmit(this.props.onClick)}>Confirmar</button>
        </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
export default ModalDeImportar;