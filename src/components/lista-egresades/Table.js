import React, { Component } from 'react'
import { Icon, Label, Button, Message, Table, Search } from 'semantic-ui-react'
import Modal from '../egresade/ver-egresade/Modal'
import Delete from '../egresade/delete-egresade/Delete'
import '../../public/stylesheets/Table.css';
import { Link } from 'react-router-dom';
import ImportModal from '../ImportButton/ImportModal';

class Nahual_Table extends Component {
  constructor() {
    super();
    this.state = {
      api: [],
      filasEncontradas: Array(0),
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
  }

  eliminarEgresadesVista(id) {
    console.log(this.state.api)
    this.setState({ api: this.state.api.filter(egresade => egresade.id !== id) })
    console.log(this.state.api)

  }

   obtenerEgresades() {
    fetch(`http://fathomless-falls-62194.herokuapp.com/api/estudiantes`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        let dat = res;
        this.setState({
          api: dat.response,
          filasEncontradas: dat.response
        });
      })
  }

  componentDidMount() {
    this.obtenerEgresades();
  }

  mostrarModal() {
    this.setState({ mostrarModal : true });
  }

  manejarProblemas = () => {
    this.setState({ mostrarMensajeDeEstado: false })
  }

  buscarPorNombre(nombre) {
    let buscado = nombre.target.value;
    let listaEgresades = this.state.api;
    let resultados = Array(0);

    if (nombre.target.value.trim() === "") {
      this.setState({
        filasEncontradas: this.state.api
      });
    }
    for (let contador = 0; contador < listaEgresades.length; contador++) {
      if (listaEgresades[contador].nombreCompleto.toLowerCase().includes(buscado.toLowerCase())) {
        resultados.push(listaEgresades[contador]);
      }
    }
    this.setState({
      filasEncontradas: resultados
    });
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
            <Search
              showNoResults={false}
              onSearchChange={this.buscarPorNombre.bind(this)}
              style={{width:"auto"}}
              >
            </Search>
            <div className="registrar" style={{ color: "black" }}>
              <Link to={'/'}>
                <ImportModal onClick={this.enRegistroExitoso} />
              </Link>
            </div>
            <div className="registrar" style={{ color: "black" }}>
              <Link to={'/registrar'}>
                <Button basic style={{ color: "black", border: '1px solid #6D5BD0' }}>
                  <Icon className='plus square' color='green' />
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
              {this.state.filasEncontradas.map((value) => (
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
                    <Modal graduateId={value.id} open={this.state.mostrarModal} />
                    <Delete egresadeId={value.id} eliminarVista={() => this.eliminarEgresadesVista(value.id)}></Delete>
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