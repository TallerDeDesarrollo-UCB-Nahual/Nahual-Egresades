import React, { Component, } from 'react';
import 'semantic-ui-css/semantic.css';
import { Button, Grid, GridRow, Confirm } from 'semantic-ui-react';
import { Form, Input, Dropdown } from 'semantic-ui-react-form-validator';
import '../../../public/stylesheets/Registrar.css';
import 'semantic-ui-css/semantic.min.css';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import { withAuthenticationRequired } from "@auth0/auth0-react";
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

function getFechaPorDefecto(){
  return new Date().toISOString().split('T')[0];
}

function prepararDatosARecuperar(estadoActual) {
  var nombre = estadoActual.nombre;
  var apellido = estadoActual.apellido;
  var fechaNacimiento = estadoActual.fechaNacimiento != null ? estadoActual.fechaNacimiento.split("T", 1).reduce((acc, fec) => acc.concat(fec), "") : getFechaPorDefecto();
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
        apellido: '',
        nodos: []
      },
    };
  }

  existeNivelIngles(nivelDeIngles) {
    if(!nivelDeIngles)
      {
        return null
      }
      else{
        return OpcionesDeNivelDeIngles.filter(op => op.value === this.state.egresade.nivelIngles)[0].valueToSend;
      }
  }

  obtenerEgresade() {
    const API_URL = `${process.env.REACT_APP_EGRESADES_NAHUAL_API}/egresades/`;
    axios
      .get(`${API_URL}${this.props.match.params.id}${"/DTO"}`)
      .then(response => {
        this.setState({
          egresade: response.data.response
        });
        let egresadeCompleto = prepararDatosARecuperar(this.state.egresade);
        egresadeCompleto = this.validarFecha(egresadeCompleto);
        this.setState({ egresade: egresadeCompleto });
        this.obtenerNodo();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  validarFecha(egresade){
    if(egresade.fechaNacimiento == null){
      egresade.fechaNacimiento = new Date().toLocaleDateString();
    }
    return egresade;
  }

  obtenerNodo() {
    const API_URL = `${process.env.REACT_APP_EGRESADES_NAHUAL_API}/nodos/`;
    axios
      .get(`${API_URL}`)
      .then(response => {
        this.setState({
          nodos: response.data.response
        });

        this.state.nodos.forEach(function (element) {
          element.text = element.nombre;
          element.key = element.nombre;
          element.value = element.nombre;
          element.valueToSend = element.id;
          element.sedes.forEach(function (element) {
            element.text = element.nombre;
            element.key = element.nombre;
            element.value = element.nombre;
            element.valueToSend = element.id;
          });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  obtenerSede(nodo) {
    if (this.state.nodos === undefined) {
      return null;
    }
    else {
      let nodoEscogido = this.state.nodos.filter(value => value.nombre === nodo)[0];
      let sedesEscogidas = nodoEscogido.sedes
      return sedesEscogidas;
    }
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
    this.setState({ abrirModal: true })
  }

  obtenerFechaNacimiento(egresade){
    if(egresade.fechaNacimiento == getFechaPorDefecto()){
      egresade.fechaNacimiento = null;
    }
    return egresade;
  }

  guardarEgresade() {
    var egresadeAEnviar = {
      ...this.state.egresade,
      nodoId: obtenerValorConvertidoDeEnvio(this.state.nodos, this.state.egresade.nodo),
      sedeId: obtenerValorConvertidoDeEnvio(this.obtenerSede(this.state.egresade.nodo), this.state.egresade.sede)
    }

    egresadeAEnviar.nivelInglesId = this.existeNivelIngles(this.state.egresade.nivelIngles)
    egresadeAEnviar = this.obtenerFechaNacimiento(egresadeAEnviar);
    egresadeAEnviar.celular = parseInt(egresadeAEnviar.celular);
    egresadeAEnviar.esEmpleado = OpcionesDeEstadoLaboral.filter(op => op.value === this.state.egresade.esEmpleado)[0].valueToSend;
    delete egresadeAEnviar.nodo;
    delete egresadeAEnviar.sede;
    delete egresadeAEnviar.nivelIngles;

    axios.put(`${process.env.REACT_APP_EGRESADES_NAHUAL_API}/estudiantes/${egresadeAEnviar.id}`, egresadeAEnviar)
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

  onChangeDropdownNodo = (e, { value, name }) => {
    let valor = this.state.egresade[name];
    this.setState({ selectedType: valor })
    this.state.egresade['sede'] = null;
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
                    validators={['matchRegexp:^[0-9]+$']}
                    errorMessages={['El campo sólo acepta números']}
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
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                <label htmlFor="nodo">Nodo<br /></label>
                  <Dropdown
                    name="nodo"
                    id="nodo"
                    placeholder={this.state.egresade.nodo}
                    selection
                    required
                    style={{ margin: "0px 15%" }}
                    options={this.state.nodos}
                    value={this.state.egresade.nodo}
                    onChange={this.onChangeDropdownNodo}
                  />
                </span>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column className="centrarColumnas">
                <span className="etiquetas">
                <label htmlFor="correo">Sede<br /></label>
                  <Dropdown
                    name="sede"
                    id="sede"
                    placeholder={this.state.egresade.sede}
                    selection
                    validators={['required']}
                    errorMessages={['Este campo es requerido, porfavor seleccione otro nodo']}
                    style={{ margin: "0px 15%" }}
                    options={this.obtenerSede(this.state.egresade.nodo)}
                    value={this.state.egresade.sede}
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
                    style={{ margin: "0px 15%" }}
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
                    style={{ margin: "0px 15%" }}
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
                    style={{ margin: "0px 15%" }}
                    selection
                  />
                </span>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column className="centrarColumnas">
                <span className="etiquetas">
                  <label htmlFor="esEmpleado">Estado Laboral<br /></label>
                  <Dropdown type="text"
                    name="esEmpleado"
                    placeholder="Estado Laboral"
                    value={this.state.modulo}
                    onChange={this.onChangeDropdown}
                    options={OpcionesDeEstadoLaboral}
                    value={this.state.egresade.esEmpleado}
                    style={{ margin: "0px 15%" }}
                    selection
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
                    validators={["matchRegexp:^[A-Za-z0-9\\!\\\"\\#\\$\\%\\&\\'\\(\\)\\*\\+\\,\\-\\.\\/\\:\\;\\<\\>\\=\\?\\@\\[\\]\\{\\}\\\\\\^\\_\\`\\~ ]+$"]}
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
            {(this.state.salir === true) && <Redirect to='/listaEgresades' />}

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