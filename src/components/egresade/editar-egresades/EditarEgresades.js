import React, { Component } from 'react';
import 'semantic-ui-css/semantic.css';
import { Dropdown, Button, Grid, GridRow, Confirm } from 'semantic-ui-react';
import { Form, Input } from 'semantic-ui-react-form-validator';
import '../../../public/stylesheets/Registrar.css';
import 'semantic-ui-css/semantic.min.css';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import { withAuthenticationRequired } from "@auth0/auth0-react";

import { OpcionesDeNodo } from './opciones-de-seleccion/OpcionesDeNodo.js';
import { OpcionesDeSede } from './opciones-de-seleccion/OpcionesDeSede.js';
import { OpcionesDeTipoDeCurso } from './opciones-de-seleccion/OpcionesDeTipoDeCurso.js';
import { OpcionesDeCuatrimestre } from './opciones-de-seleccion/OpcionesDeCuatrimestre.js';
import { OpcionesDeNivelDeIngles } from './opciones-de-seleccion/OpcionesDeNivelDeIngles.js';
import { OpcionesDeEstadoLaboral } from './opciones-de-seleccion/OpcionesDeEstadoLaboral.js';
import { MensajeResultante } from './tipo-de-mensaje/MensajeResultante.js';
import VistaNoAutorizado from "../../inicio-de-sesion/VistaNoAutorizado"

function obtenerEstadoDepurado(estadoActual) {
  var estadoDepurado = estadoActual;
  delete estadoDepurado.fechaNacimiento;
  delete estadoDepurado.esEmpleado;
  return estadoDepurado;
}

function prepararDatosARecuperar(estadoActual) {
  var nombre = estadoActual.nombre;
  var apellido = estadoActual.apellido;
  var fechaNacimiento = estadoActual.fechaNacimiento.split("T", 1).reduce((acc, fec) => acc.concat(fec), "");
  var esEmpleado = OpcionesDeEstadoLaboral.filter(opcion => opcion.key === (estadoActual.esEmpleado ? 1 : 0))[0].value;
  let estadoDepurado = obtenerEstadoDepurado(estadoActual);
  return { ...estadoDepurado, nombre, apellido, fechaNacimiento, esEmpleado };
}

function obtenerValorConvertidoDeEnvio(opciones, valorAConvertir) {
   return opciones.filter(op => op.key === valorAConvertir)[0].valueToSend;
}

export class EditarEgresades extends Component {
  state = {
    exito: null,
    salir: false
  };
  constructor(props) {
    super(props);
    this.state = {
      egresade: {
        nombre: '',
        apellido: ''
      },
    };

  }
  obtenerEgresade() {
    const API_URL = `https://nahual-datos-estudiantes.herokuapp.com/api/egresades/`;
    axios
      .get(`${API_URL}${this.props.match.params.id}${"/DTO"}`)
      .then(response => {
        this.setState({
          egresade: response.data.response
        });
        let egresadeCompleto = prepararDatosARecuperar(this.state.egresade);
        this.setState({ egresade: egresadeCompleto });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.obtenerEgresade();
  }

  enCambio = (event) => {
    let nombre = event.target.name;
    let valor = event.target.value;
    let estadoDepurado = this.state.egresade;
    delete estadoDepurado[`${nombre}`];
    let nuevoEstado = { ...estadoDepurado, [`${nombre}`]: valor };
    this.setState({ egresade: nuevoEstado });
  }

  enConfirmacion = (evento) => {
    evento.preventDefault();
    var nombreConcatenado = this.state.egresade.nombre + " " + this.state.egresade.apellido;
    this.state.egresade.nombreCompleto = nombreConcatenado;
    this.setState({ abrirModal: true })
  }

  guardarEgresade() {
    var egresadeAEnviar = {
      ...this.state.egresade,
      nodoId: obtenerValorConvertidoDeEnvio(OpcionesDeNodo, this.state.egresade.nodo),
      sedeId: obtenerValorConvertidoDeEnvio(OpcionesDeSede, this.state.egresade.sede),
      nivelInglesId: obtenerValorConvertidoDeEnvio(OpcionesDeNivelDeIngles, this.state.egresade.nivelIngles)
    }
    egresadeAEnviar.celular = parseInt(egresadeAEnviar.celular);
    egresadeAEnviar.esEmpleado = OpcionesDeEstadoLaboral.filter(op => op.value === this.state.egresade.esEmpleado)[0].valueToSend;
    delete egresadeAEnviar.nombre;
    delete egresadeAEnviar.apellido;
    delete egresadeAEnviar.nodo;
    delete egresadeAEnviar.sede;
    delete egresadeAEnviar.nivelIngles;
    console.log(egresadeAEnviar);
    axios.put(`https://nahual-datos-estudiantes.herokuapp.com/api/estudiantes/${egresadeAEnviar.id}`, egresadeAEnviar)
      .then(function (respuesta) {
        this.setState({ salir: true });
      }.bind(this))
      .catch(function (error) {
        this.setState({ exito: false });
        console.log(error);
      }.bind(this));
    setTimeout(() => { this.setState({ exito: null }); }, 5000);
  }

  handleButtonClick = () => this.setState({ abrirModal: true })

  handleCancel = () => this.setState({ abrirModal: false })

  handleConfirm = () => {
    this.setState({ abrirModal: false })
    this.guardarEgresade();
  }

  onChangeDropdown = (e, { value, name }) => {
    let valor = this.state.egresade[name];
    this.setState({ selectedType: valor })
    valor = value;
    this.state.egresade[name] = valor;
  }

  filtrarSedes(opcionesSede, valorAConvertir) {
    return opcionesSede.filter(op => op.nodo === valorAConvertir);
  }

  render() {

    return (
      <div className="contenedor">
        <Form id="myForm" onSubmit={this.enConfirmacion} className="ui form">
          <Grid divided='vertically' stackable columns={2}>
            <Grid.Row >
              <Grid.Column className="centrarColumnas">
                <span className="etiquetas">
                  <label htmlFor="nombre">Nombre<br /></label>
                  <Input class="ui one column stackable center aligned page grid" type="text"
                    name="nombre"
                    maxLength="20"
                    placeholder="Nombre"
                    value={this.state.egresade.nombre}
                    validators={['required', 'matchRegexp:^[A-Za-z ]+$']}
                    errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="apellido">Apellidos<br /></label>
                  <Input type="text"
                    name="apellido"
                    maxLength="30"
                    placeholder="Apellido"
                    value={this.state.egresade.apellido}
                    validators={['required', 'matchRegexp:^[A-Za-z ]+$']}
                    errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="fechaNacimiento">Fecha de Nacimiento<br /></label>
                  <Input type="date"
                    name="fechaNacimiento"
                    pattern="[0-9]*"
                    placeholder="Fecha de Nacimiento"
                    value={this.state.egresade.fechaNacimiento}
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    style={{ margin: "0px 15%" }}
                    min="1960-01-01"
                    max="2020-01-01"
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="telefono">Teléfono de Contacto<br /></label>
                  <Input type="text"
                    maxLength="10"
                    name="celular"
                    placeholder="Celular"
                    value={this.state.egresade.celular}
                    validators={['required', 'matchRegexp:^[0-9]+$']}
                    errorMessages={['Este campo es requerido', 'El campo sólo acepta números']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="correo">Correo Electrónico<br /></label>
                  <Input type="email"
                    name="correo"
                    placeholder="Correo Electrónico"
                    value={this.state.egresade.correo}
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="correo">Sede<br /></label>
                  <Dropdown
                    name="sede"
                    id="sede"
                    placeholder="Sede"
                    selection
                    required
                    style={{ margin: "0px 11%" }}
                    options={this.filtrarSedes(OpcionesDeSede, this.state.egresade.nodo)}
                    value={this.state.egresade.sede}
                    onChange={this.onChangeDropdown}
                  />
                </span>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column className="centrarColumnas">
                <span className="etiquetas">
                  <label htmlFor="nodo">Nodo<br /></label>
                  <Dropdown
                    name="nodo"
                    id="nodo"
                    placeholder="Nodo"
                    selection
                    required
                    style={{ margin: "0px 11%" }}
                    options={OpcionesDeNodo}
                    value={this.state.egresade.nodo}
                    onChange={this.onChangeDropdown}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="nivelIngles">Nivel de Ingles<br /></label>
                  <Dropdown type="text"
                    name="nivelIngles"
                    placeholder="Nivel de Inglés"
                    value={this.state.egresade.nivelIngles}
                    onChange={this.onChangeDropdown}
                    options={OpcionesDeNivelDeIngles}
                    style={{ margin: "0px 11%" }}
                    selection
                    required
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="cuatrimestre">Cuatrimestre<br /></label>
                  <Dropdown type="text"
                    name="cuatrimestre"
                    onChange={this.onChangeDropdown}
                    options={OpcionesDeCuatrimestre}
                    value={this.state.egresade.cuatrimestre}
                    placeholder='Cuatrimestre'
                    style={{ margin: "0px 11%" }}
                    selection
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="modulo">Tipo de Curso<br /></label>
                  <Dropdown type="text"
                    name="modulo"
                    placeholder="Tipo de Curso"
                    value={this.state.modulo}
                    onChange={this.onChangeDropdown}
                    validators={['required']}
                    options={OpcionesDeTipoDeCurso}
                    value={this.state.egresade.modulo}
                    style={{ margin: "0px 11%" }}
                    selection
                  />
                </span>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column className="centrarColumnas">
                <span className="etiquetas">
                  <label htmlFor="esEmpleado">Estado Laboral<br /></label>
                  <Dropdown
                    name="esEmpleado"
                    placeholder="Estado Laboral"
                    selection
                    onChange={this.onChangeDropdown}
                    style={{ margin: "0px 11%" }}
                    options={OpcionesDeEstadoLaboral}
                    value={this.state.egresade.esEmpleado}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="nombrePrimerTrabajo">Nombre Primer Empleo<br /></label>
                  <Input type="text"
                    name="nombrePrimerTrabajo"
                    maxLength="40"
                    placeholder="Nombre Primer Empleo"
                    value={this.state.egresade.nombrePrimerTrabajo}
                    validators={['matchRegexp:^[A-Za-z]+$']}
                    errorMessages={['El campo no acepta valores numéricos']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label for="añoGraduacion">Año de Graduación<br /></label>
                  <Input type="text"
                    name="añoGraduacion"
                    min={1950}
                    max={2100}
                    pattern="[0-9]*"
                    maxLength="4"
                    minLength="4"
                    placeholder="Año"
                    value={this.state.egresade.añoGraduacion}
                    validators={['required', 'matchRegexp:^[0-9]+$']}
                    errorMessages={['Este campo es requerido', 'El campo sólo acepta números']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="linkedin">Enlace de CV en LinkedIn<br /></label>
                  <Input type="url"
                    name="linkedin"
                    placeholder="LinkedIn"
                    value={this.state.egresade.linkedin}
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid centered rows={1} columns={1}>
            <GridRow>
              <Link to={'/listaEgresades'}><Button className="ui basic negative button" style={{ margin: "0px 50px 10px 50px" }}>Cancelar</Button></Link>
              <Confirm
                header='¿Está seguro que desea guardar los cambios?'
                content="Si confirma el guardado, será redirigido a la lista principal"
                open={this.state.abrirModal}
                cancelButton='Cancelar'
                confirmButton='Confirmar'
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
              />
                <Button className="ui basic positive button" style={{ margin: "0px 50px 10px 50px", background: "rgb(129,206,50)" }}>Confirmar</Button>
            </GridRow>
              {(this.state.salir === true) && <Redirect to='/listaEgresades'/>}

          </Grid>
        </Form>
        {(this.state.exito === false) && (
          <MensajeResultante encabezadoDelMensaje="Guardado no exitoso" cuerpoDelMensaje="Hubo un error al momento de guardar, intenta de nuevo más tarde" colorDeFondo="red" />)}
      </div>
    );
  }
}

export default withAuthenticationRequired(EditarEgresades, {
  onRedirecting: () => <VistaNoAutorizado />,
});