import React, { Component } from 'react'
import { Label, Button, Message, Table, Search, Segment, Dropdown, Input } from 'semantic-ui-react'
import Modal from '../egresade/ver-egresade/Modal'
import '../../public/stylesheets/Table.css';
import { Link } from 'react-router-dom';
import ModalDeImportar from '../boton-importar/ModalDeImportar';
import Eliminar from '../egresade/eliminar-egresade/Eliminar';
import './Tablas.css'
import { Dimmer, Loader } from "semantic-ui-react";

const { REACT_APP_EGRESADES_NAHUAL_API }  = process.env;

class Nahual_Table extends Component {
  constructor() {
    super();
    this.state = {
      api: [],
      busqueda: '',
      egresades: [],
      filasEncontradas: Array(0),
      mensajeDeEstado: "",
      mostrarMensajeDeEstado: false,
      open: false,
      stateOptions : [
        {
          key: 'Todes',
          text: 'Todes',
          value: 'Todes',
          /* label: { color: '', empty: true, circular: true }, */
        },
        {
          key: 'Egresade',
          text: 'Egresade',
          value: 'Egresade',
/*           label: { color: '', empty: true, circular: true },
 */        },
        {
          key: 'Empleade',
          text: 'Empleade',
          value: 'Empleade',
          /* label: { color: '', empty: true, circular: true }, */
        }
      ],
      currentFilter: 'Todes',
      valueFilter:'',
      cargando: true
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
          egresades: dat.response,
          filasEncontradas: dat.response,
          cargando: false
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

  onSearchChange = e => {
    this.setState({busqueda: e.target.value});
    this.filtrarEgresades();
  }
  buscarPorNombre(nombre){
    let buscado = nombre.target.value;
    let listaEgresades = this.state.api;
    let resultados = Array(0);
    if (nombre.target.value.trim() === "") {
      this.setState({
        filasEncontradas: this.state.api
      });
    }
    for (let contador = 0; contador < listaEgresades.length; contador++) {      
      if (listaEgresades[contador].nombre.toLowerCase().includes(buscado.toLowerCase())) {
        /* if(listaEgresades[contador].esEmpleado) {
          resultados.push(listaEgresades[contador]);
        } */

        switch (this.state.currentFilter) {
          case 'Egresade':
              if(!listaEgresades[contador].esEmpleado) {
                resultados.push(listaEgresades[contador]);
              }
            break;
          case 'Empleade':
              if(listaEgresades[contador].esEmpleado) {
                resultados.push(listaEgresades[contador]);
              }
            break;
          default:
              resultados.push(listaEgresades[contador]);
        }
      }
    }
    this.setState({
      filasEncontradas: resultados,
      valueFilter: nombre.target.value
    },()=>{});
  }

  activeFilter(filter){
    console.log(filter)
    this.setState({
      currentFilter: filter
    },()=>{ 
      this.buscarPorNombre(
      {target:{value:this.state.valueFilter}}
    )});
   
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
      
              onSearchChange={this.buscarPorNombre.bind(this)}
              style={{ width: "auto" }}
            >
            </Search>
            <div className="registrar" style={{ color: "black" }}>
              
              <ModalDeImportar onClick={this.enRegistroExitoso} />
            </div>
          </div>

          <Dropdown
            text={this.state.currentFilter}
            icon='filter'
            floating
            labeled
            button
            className='icon'
          >
            <Dropdown.Menu>
              
              <Dropdown.Divider />
              <Dropdown.Header icon='tags' content='Estados' />
              <Dropdown.Menu scrolling>
                {this.state.stateOptions.map((option) => (
                  <Dropdown.Item 
                  active={option.value === this.state.currentFilter}
                  key={option.value} {...option} 
                  onClick={()=>{this.activeFilter(option.value)}}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown.Menu>
          </Dropdown>
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
              {this.state.cargando? 
              (<Table.Row>
                <td colSpan="5">
                  <div class="ui active centered inline loader"></div>
                </td>
              </Table.Row>) :
              (this.state.egresades.map((value) => (
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
              )))
              }
            </Table.Body>
          </Table>

        </div>
      </div>)

  }

}
export default Nahual_Table;
