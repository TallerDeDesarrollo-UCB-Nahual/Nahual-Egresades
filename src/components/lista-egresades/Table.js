import React, { Component } from 'react'
import { Icon, Label, Button, Message, Table, Confirm } from 'semantic-ui-react'
import Modal from '../egresade/view-egresade/Modal'
import '../../public/stylesheets/Table.css';
import filter from '../../public/images/filter.png';
import search from '../../public/images/search.png'
import { Link } from 'react-router-dom'
import ImportModal from '../ImportButton/ImportModal'
import axios from "axios";


class Nahual_Table extends Component {
  constructor() {
    super();
    this.state = {
      api: [],
      mensajeDeEstado: "",
      mostrarMensajeDeEstado: false,
      open: false
    }
    this.enRegistroExitoso = this.enRegistroExitoso.bind(this)
  }
 
  mostrarMensajeConfirmacion = () =>(  
      this.setState({ 
      open: true})
  )

  // open = () => this.setState({ 
  //   open: true})
  close = () => this.setState({ open: false })

  enRegistroExitoso(contador) {
    if (contador > 0) {
      this.setState({
        mensajeDeEstado: "Se realizo el registro de " + contador + " egresados exitosamente.",
        mostrarMensajeDeEstado: true
      });
    }
  }

  eliminarEgresadeDeAPI(id) {
    const API_URL = `http://fathomless-falls-62194.herokuapp.com/api/estudiantes/`;
    axios
      .delete(`${API_URL}${id}`)
      .then(response => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    fetch(`http://fathomless-falls-62194.herokuapp.com/api/estudiantes`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        let data = res;
        this.setState({ api: data.response })
      })
  }
  mostrarModal() {
    this.setState({ mostrarModal: true });
  }

  manejarProblemas = () => {
    this.setState({ mostrarMensajeDeEstado: false })
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
                montent={this.state.MensajeDeEstado}
              ></Message>
              :
              <p></p>
            }
          </div>

          <div className="tabla-menu">
            {/* <div className="filtrar">
              <img src={filter}></img>
              <label className="filter1"> Filtrar</label>
            </div> 
            <div className="buscar">
              <img src={search} className="icono-buscar"></img>
              <input className="input-buscar"></input>
            </div>*/}
            <div className="registrar" style={{ color: "black" }}>
              <Link to={'/'}>
                <ImportModal onClick={this.enRegistroExitoso} />
              </Link>
            </div>
            <div className="registrar" style={{ color: "black" }}>
              <Link to={'/registrar'}>
                <Button basic style={{ color: "black", border: '1px solid #6D5BD0' }}>
                  <Icon name='plus square' color='green' />
                  Registrar
                </Button>
              </Link>
            </div>
          </div>
          <br /><br />
          <Table celled className="tarjeta-tabla">
            <Table.Header>
              <Table.Row >
                <Table.HeaderCell className="cabeceras-tabla">Nombre y Apellido</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Nodo</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Modulo Cursado</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Acción</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.api.map((value) => (
                <Table.Row key={value.id} >
                  <Table.Cell className="bordes-tabla">
                    <Label className="nombre">{value.nombreCompleto}</Label><br></br>
                    <Label className="email">{value.correo}</Label>
                  </Table.Cell >
                  <Table.Cell className="bordes-tabla">
                    <Label className="tarjeta-azul">• {value.nombreNodo}</Label>
                  </Table.Cell>
                  <Table.Cell className="bordes-tabla">
                    <Label className="tarjeta-verde">• {value.modulo}</Label></Table.Cell>
                  <Table.Cell colSpan="3" className="bordes-tabla">
                    {/* <Button className="view-button">
                      <i className="edit icon"></i>
                      <label className="icono-texto">Editar</label>
                    </Button> */}
                    <Modal graduateId={value.id} open={this.state.mostrarModal} />
                    <Button onClick={()=>this.mostrarMensajeConfirmacion()}>
                      <i className="user delete icon"></i>
                      <label className="icon-delete">Eliminar</label>
                    </Button>
                    <Confirm
                        open={this.state.open}
                        content='Se eliminará permanentemente'
                        onCancel={this.close}
                        onConfirm={this.eliminarEgresadeDeAPI(value.id), this.close}
                      />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='4' className="no-border">
                  {/* <Menu floated='right' pagination>
                    <Menu.Item as='a' icon>
                      <Icon name='chevron left' />
                    </Menu.Item>
                    <Menu.Item as='a'>1</Menu.Item>
                    <Menu.Item as='a'>2</Menu.Item>
                    <Menu.Item as='a'>3</Menu.Item>
                    <Menu.Item as='a'>4</Menu.Item>
                    <Menu.Item as='a' icon>
                      <Icon name='chevron right' />
                    </Menu.Item>
                  </Menu> */}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>

        </div>
      </div>)

  }

}
export default Nahual_Table;