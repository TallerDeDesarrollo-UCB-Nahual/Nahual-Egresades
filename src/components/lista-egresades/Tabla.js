import React, { Component } from 'react'
import { Label, Button, Message, Table, Search } from 'semantic-ui-react'
import Modal from '../egresade/ver-egresade/Modal'
import '../../public/stylesheets/Table.css';
import { Link } from 'react-router-dom';
import ModalDeImportar from '../boton-importar/ModalDeImportar';
import Eliminar from '../egresade/eliminar-egresade/Eliminar';
const { REACT_APP_EGRESADES_NAHUAL_API }  = process.env;

class Nahual_Table extends Component {
  constructor() {
    super();
    this.state = {
      api: [],
      busqueda: '',
      egresades: [],
      mensajeDeEstado: "",
      mostrarMensajeDeEstado: false,
      open: false
    }
    this.enRegistroExitoso = this.enRegistroExitoso.bind(this)
  }

  enRegistroExitoso(contador) {
    if (contador > 0) {
      this.setState({
        mensajeDeEstado: "Se realizo el registro de " + contador + " egresados exitosamente.",
        mostrarMensajeDeEstado: true
      });
    }
    this.obtenerEgresades();
  }

  obtenerEgresades() {
    fetch(`${REACT_APP_EGRESADES_NAHUAL_API}/egresades/DTO`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        let dat = res;
        this.setState({
          api: dat.response,
          egresades: dat.response
        });
      })
      
  }

  eliminarEgresadesVista(id) {
    this.obtenerEgresades();
  }

  componentDidMount() {
    this.obtenerEgresades();
  }

  mostrarModal() {
    this.setState({ mostrarModal: true });
  }

  manejarProblemas = () => {
    this.setState({ mostrarMensajeDeEstado: false })
  }

  onSearchChange = async e => {
    e.persist();
    await this.setState({busqueda: e.target.value});
    this.filtrarEgresades();
  }

  filtrarEgresades = () =>{
    var search = this.state.api.filter(item=>{
      if((item.nombre.toLowerCase() + ' ' + item.apellido.toLowerCase()).includes(this.state.busqueda.toLowerCase()) ||
        item.nodo.toLowerCase().includes(this.state.busqueda.toLowerCase()) ||
        item.sede.toLowerCase().includes(this.state.busqueda.toLowerCase()) 
      ){
        return item;
      }
    })
    this.setState({egresades: search});
  }



  render() {
    return (
      <div>
        <div className="tabla">
          <p className="titulo">Lista de Egresades</p>
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

          <div className="tabla-menu">
            <Search
              showNoResults={false}
              onSearchChange={this.onSearchChange}
              value = {this.state.busqueda}
              style={{ width: "auto" }}
            >
            </Search>
            <div className="registrar" style={{ color: "black" }}>
              
              <ModalDeImportar onClick={this.enRegistroExitoso} />
            </div>
          </div>
          <br /><br />
          <Table celled className="tarjeta-tabla">
            <Table.Header>
              <Table.Row >
                <Table.HeaderCell className="cabeceras-tabla">Nombre y Apellido</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Nodo</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Sede</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Modulo Cursado</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Acción</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.egresades.map((value) => (
                <Table.Row key={value.id} >
                  <Table.Cell className="bordes-tabla">
              <Label className="nombre">{value.nombre} {value.apellido}</Label><br></br>
                    <Label className="email">{value.correo}</Label>
                  </Table.Cell >
                  <Table.Cell className="bordes-tabla">
                    <Label className="tarjeta-azul">• {value.nodo}</Label>
                  </Table.Cell>
                  <Table.Cell className="bordes-tabla">
                    <Label className="tarjeta-azul">• {value.sede}</Label>
                  </Table.Cell>
                  <Table.Cell className="bordes-tabla">
                    <Label className="tarjeta-verde">• {value.modulo}</Label></Table.Cell>
                  <Table.Cell colSpan="3" className="bordes-tabla">
                    {<Link to={`/editar/${value.id}`}><Button className="view-button">
                      <i className="edit icon"></i>
                      <label className="icon-text">Editar</label>
                    </Button></Link>
                    }

                    <Modal egresadeId={value.id} open={this.state.mostrarModal} />
                    <Eliminar egresadeId={value.id} eliminarVista={() => this.eliminarEgresadesVista(value.id)}></Eliminar>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='4' className="no-border">
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>

        </div>
      </div>)

  }

}
export default Nahual_Table;