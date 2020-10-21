import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { CSVReader } from 'react-papaparse'
import { Button, Modal } from 'semantic-ui-react'
import CargarLista from './CargarLista';

const publicarListaDeEgresades_URL = 'http://fathomless-falls-62194.herokuapp.com/api/egresades'

class ImportarModal extends Component {
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
        "nombreCompleto": fila.data["Nombre y apellido"],
        "nombreEstado": "Egresade",
        "fechaNacimiento": fila.data["Fecha de Nacimiento"],
        "correo": fila.data["Mail"],
        "celular": fila.data["Numero de Celular"],
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

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
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
      <div><Modal
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
                skipEmptyLines: true
              }}
              onDrop={this.handleOnDrop}
              onError={this.handleOnError}
              addRemoveButton
              onRemoveFile={this.handleOnRemoveFile}>
              <span>Drop CSV file here to upload.</span>
            </CSVReader>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          {this.state.mostrarLista && this.state.egresades !== [] ?
            <CargarLista json={this.state.egresades} />
            :
            <h1 align="center">No se cargo ningun archivo</h1>}
          <button className="ui basic negative button" onClick={() => this.setAbierto(false)}>Cancelar</button>
          <button className="ui basic positive button" style={{border: "rgb(129,206,50)" }} onClick={() => this.onSubmit(this.props.onClick)}>Confirmar</button>
        </Modal.Actions>
      </Modal>
      </div>
    )
  }
}
export default ImportarModal;