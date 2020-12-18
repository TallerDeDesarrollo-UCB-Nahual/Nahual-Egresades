import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { CSVReader } from 'react-papaparse'
import { Message, Button, Modal, Table } from 'semantic-ui-react'
import CargarLista from './CargarLista';
import exampleXlsx from '../../public/example.csv'
import { withAuthenticationRequired } from "@auth0/auth0-react";
import axios from 'axios';
import VistaNoAutorizado from "../inicio-de-sesion/VistaNoAutorizado"
var listaNodos = [];
var listaSedes = [];

const findNodo = (datos, nodo) => {

  if (datos.find(el => el == nodo)) {
    return true
  }
  return false; // so check result is truthy and extract `id`
}
const findSede = (data, sede) => {
  if (data.find(el => el == sede)) {
    return true
  }
  return false; // so check result is truthy and extract `id`
}

const publicarListaDeEgresades_URL = `${process.env.REACT_APP_EGRESADES_NAHUAL_API}/egresades/`;

class ModalDeImportar extends Component {
  obtenerNodosYSedes = async () => {
    const API_URL = `${process.env.REACT_APP_EGRESADES_NAHUAL_API}/nodos/`; //cambiar esto para deployar
    await
      axios
        .get(`${API_URL}`)
        .then(response => {
          this.setState({
            respuestaNodos: response.data.response
          });
          this.state.respuestaNodos.forEach(function (element) {
            listaNodos.push(element.nombre)
            element.sedes.forEach(function (element) {
              listaSedes.push(element.nombre)
            });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  constructor(props) {
    super(props);
    this.obtenerNodosYSedes()
    this.state = {
      abierto: false,
      mostrarLista: false,
      egresades: [],
      contadorEgresades: 0,
      mensajeDeErrorDeCarga: "",
      mostrarMensajeDeErrorDeCarga: false,
      respuestaNodos: []
    };
    this.mostrarTabla = this.mostrarTabla.bind(this);
    this.setAbierto = this.setAbierto.bind(this);
    this.errorDeCarga = this.errorDeCarga.bind(this)
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
      }
    })
      .catch(err => {
        console.log("error al leer los datos " + err)
      })
  }

  handleOnDrop = (data) => {

    data.forEach(fila => {
      var nodo = fila.data["NODO"]
      var sede = fila.data["SEDE"]

      if ((findNodo(listaNodos, nodo)) && (findSede(listaSedes, sede))) {
        var egresade = {
          "nombre": fila.data["Nombre"],
          "apellido": fila.data["Apellido"],
          "Estado": "Egresade",
          "fechaNacimiento": fila.data["Fecha de Nacimiento"] == ""? "12/17/2020": fila.data["Fecha de Nacimiento"],
          "correo": fila.data["Mail"],
          "celular": fila.data["Numero de Celular"],
          "sede": fila.data["SEDE"],
          "nodo": fila.data["NODO"],
          "añoGraduacion": fila.data["Anio"],
          "cuatrimestre": fila.data["Cuatri"],
          "nivelIngles": fila.data["Ingles"]=== "Básico"? "Basico":fila.data["Ingles"],
          "nombrePrimerTrabajo": fila.data["Empresa IT primer empleo"],
          "linkedin": fila.data["Linkedin"],
          "esEmpleado": fila.data["Consiguio trabajo luego de egresar?"] === "Sí" || fila.data["Consiguio trabajo luego de egresar?"] === "Si" ? true : false,
          "modulo": fila.data["Tipo de curso del cual egreso"]
        }
        this.state.egresades.push(egresade)
        this.incrementarContadorEgresades()
      }
      else {
        this.state.egresades = []
        this.setState({ contadorEgresades: 0 })
        this.errorDeCarga();
        throw null;
      }
      this.mostrarTabla()
    });
  }

  errorDeCarga() {
    this.setState({
      mensajeDeErrorDeCarga: "Error de formato en la columna Nodos o Sedes, verifique la informacion..",
      mostrarMensajeDeErrorDeCarga: true
    });
    this.handleOnRemoveFile();
  }

  manejarProblemasErrorDeCarga = () => {
    this.setState({ mostrarMensajeDeErrorDeCarga: false })
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
            <div>
              {this.state.mostrarMensajeDeErrorDeCarga ?
                <Message
                  negative
                  onDismiss={this.manejarProblemasErrorDeCarga}
                  header='Error de carga!'
                  content={this.state.mensajeDeErrorDeCarga}
                ></Message>
                :
                <p></p>
              }
            </div>
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
          <div className="container">
            <h4>Nombres de headers del archivo .csv para la carga</h4>
            <h5>El formato de fecha debe ser mm/dd/yyyy</h5>
            <h5>No deben haber comillas entre los campos</h5>
            <h5>El archivo no debe sobrepasar las 450 filas</h5>
          </div>
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
            <Button><a href={exampleXlsx} download="example.csv">Descargar Ejemplo</a></Button>

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


export default withAuthenticationRequired(ModalDeImportar, {
  onRedirecting: () => <VistaNoAutorizado />,
});