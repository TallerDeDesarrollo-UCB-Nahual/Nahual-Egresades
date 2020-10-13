import React, { Component } from 'react';
import 'semantic-ui-css/semantic.css';
import {Dropdown, Button, Grid, GridRow, Confirm} from 'semantic-ui-react';
import {Form, Input } from 'semantic-ui-react-form-validator';
import '../../public/stylesheets/Registrar.css';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom'
import axios  from 'axios';
import {OpcionesDeNodo} from './opciones-de-seleccion/OpcionesDeNodo.js';
import {OpcionesDeTipoDeCurso} from './opciones-de-seleccion/OpcionesDeTipoDeCurso.js';
import {OpcionesDeCuatrimestre} from './opciones-de-seleccion/OpcionesDeCuatrimestre.js';
import {OpcionesDeNivelDeIngles} from './opciones-de-seleccion/OpcionesDeNivelDeIngles.js';
import {OpcionesDeEstadoLaboral} from './opciones-de-seleccion/OpcionesDeEstadoLaboral.js';
import {MensajeResultante} from './tipo-de-mensaje/MensajeResultante.js';
import Cargando from '../inicio-de-sesion/Cargando';
import { withAuthenticationRequired } from "@auth0/auth0-react";

const rutaEstudiantes = 'https://mighty-anchorage-20911.herokuapp.com/api/students';

function obtenerEstadoDepurado(estadoActual){
  var estadoDepurado = estadoActual;
  delete estadoDepurado.fechaNacimiento; 
  delete estadoDepurado.esEmpleado;
  return estadoDepurado;
}

function prepararDatosARecuperar(estadoActual){
  var [head, ...rest] = estadoActual.nombreCompleto.split(" ");
  var nombre = head;
  var apellido = rest.reduce(function (acc, char){ return acc.concat(char, " "); }, "").trim();
  var fechaNacimiento = estadoActual.fechaNacimiento.split("T", 1).reduce((acc, fec)=>acc.concat(fec), "");
  var esEmpleado = OpcionesDeEstadoLaboral.filter(opcion => opcion.key === (estadoActual.esEmpleado? 1:0)).text;
  let estadoDepurado = obtenerEstadoDepurado(estadoActual);
  return {...estadoDepurado, nombre, apellido, fechaNacimiento, esEmpleado};
}

export class EditarEgresades extends Component {
  state = {
    exito: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      egresade: {
        nombre:'',
        apellido:''
      },
    };
    
  }

  componentDidMount()
  {
    const API_URL = `http://fathomless-falls-62194.herokuapp.com/api/egresades/`;
      axios
        .get(`${API_URL}${this.props.match.params.id}`)
        .then(response => {
          this.setState({
            egresade: response.data.response
          });
          let egresadeCompleto = prepararDatosARecuperar(this.state.egresade);
          this.setState({egresade:egresadeCompleto});
        })
        .catch(function (error) {
          console.log(error);
        });  
  } 

  enCambio = (event) =>{
      let nombre = event.target.name;
      let valor = event.target.value;
      let estadoDepurado = this.state.egresade;
      delete estadoDepurado[`${nombre}`];
      let nuevoEstado = {...estadoDepurado, [`${nombre}`]: valor};
      this.setState({egresade: nuevoEstado});
  }

  enConfirmacion = (evento) =>{
      evento.preventDefault();
      var nombreConcatenado = this.state.egresade.nombre + " " + this.state.egresade.apellido;
      this.state.egresade.nombreCompleto = nombreConcatenado;
      this.setState({abrirModal: true})
      console.log(this.state);
  }

  guardarEgresade(){
    var egresadeAEnviar = this.state.egresade;
    egresadeAEnviar.celular = parseInt(egresadeAEnviar.celular);
    delete egresadeAEnviar.nombre;
    delete egresadeAEnviar.apellido;
    console.log(egresadeAEnviar);
    axios.put(`http://fathomless-falls-62194.herokuapp.com/api/estudiantes/${egresadeAEnviar.id}`, egresadeAEnviar)
    .then(function (respuesta){
      window.open("/listaEgresades", "_self");
    })
    .catch(function(error){
      this.setState({exito: false});
    }.bind(this));
    setTimeout(() => { this.setState({ exito: null }); }, 5000); 
  }

  handleButtonClick = () => this.setState({abrirModal: true})

  handleCancel = () => this.setState({ abrirModal: false })

  handleConfirm = () => {
    this.setState({ abrirModal: false })
    this.guardarEgresade();
  }

  onChangeDropdown = (e, { value, name }) => {
    console.log(name);
    let valor = this.state.egresade[name];
    this.setState({selectedType: valor})
    valor = value;
    this.state.egresade[name] = valor;
  }

  render() {
        return (
           <div className="contenedor">
                <Form id="myForm" onSubmit={this.enConfirmacion} className="ui form">
                  <Grid divided='vertically' stackable columns={2}>
                    <Grid.Row >
                      <Grid.Column className="centrarColumnas">
                        <span className="etiquetas">
                          <label htmlFor="nombre">Nombre<br/></label>
                          <Input class="ui one column stackable center aligned page grid" type="text" 
                            name="nombre"
                            maxLength="20"  
                            placeholder="Nombre" 
                            value={this.state.egresade.nombre} 
                            validators={['required','matchRegexp:^[A-Za-z ]+$']} 
                            errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']} 
                            style={{margin: "0px 15%"}}
                            onChange={this.enCambio}
                          />
                        </span>
                      </Grid.Column>
                      <Grid.Column>
                        <span className="etiquetas">
                          <label htmlFor="apellido">Apellidos<br/></label>
                          <Input type="text" 
                              name="apellido"
                              maxLength="30"                 
                              placeholder="Apellido"  
                              value={this.state.egresade.apellido} 
                              validators={['required','matchRegexp:^[A-Za-z ]+$']} 
                              errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']} 
                              style={{margin: "0px 15%"}}
                              onChange={this.enCambio}
                          />
                        </span>
                      </Grid.Column>
                      <Grid.Column>
                        <span className="etiquetas">
                        <label htmlFor="fechaNacimiento">Fecha de Nacimiento<br/></label>
                        <Input type="date" 
                            name="fechaNacimiento" 
                            pattern="[0-9]*" 
                            placeholder="Fecha de Nacimiento" 
                            value={this.state.egresade.fechaNacimiento} 
                            validators={['required']} 
                            errorMessages={['Este campo es requerido']} 
                            style={{margin: "0px 15%"}}
                            min="1960-01-01"
                            max="2020-01-01"
                            onChange={this.enCambio}
                          />
                        </span>
                      </Grid.Column>
                      <Grid.Column>
                        <span className="etiquetas">
                          <label htmlFor="telefono">Teléfono de Contacto<br/></label>
                          <Input type="text" 
                            maxLength="10"
                            name="celular" 
                            placeholder="Celular" 
                            value={this.state.egresade.celular}
                            validators={['required','matchRegexp:^[0-9]+$']} 
                            errorMessages={['Este campo es requerido', 'El campo sólo acepta números']} 
                            style={{margin: "0px 15%"}}
                            onChange={this.enCambio}
                          />
                        </span>
                      </Grid.Column>
                      <Grid.Column>
                        <span className="etiquetas">
                        <label htmlFor="correo">Correo Electrónico<br/></label>
                          <Input type="email" 
                            name="correo"
                            placeholder="Correo Electrónico"
                            value={this.state.egresade.correo}
                            validators={['required']} 
                            errorMessages={['Este campo es requerido']} 
                            style={{margin: "0px 15%"}}
                            onChange={this.enCambio}
                          />
                        </span>
                      </Grid.Column>
                    </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column className="centrarColumnas">
                    <span className="etiquetas">
                      <label htmlFor="nombreNodo">Nodo<br/></label>
                      <Dropdown
                            name="nombreNodo" 
                            id="nombreNodo"
                            placeholder="Nodo"
                            selection
                            required 
                            style={{margin: "0px 11%"}}
                            options={OpcionesDeNodo}
                            value={this.state.egresade.nombreNodo}
                            onChange={this.onChangeDropdown}
                      />
                    </span>
                  </Grid.Column>
                  <Grid.Column>
                    <span className="etiquetas">
                      <label htmlFor="nivelIngles">Nivel de Ingles<br/></label>
                      <Dropdown type="text"
                            name="nivelIngles"
                            placeholder="Nivel de Ingles"
                            value={this.state.egresade.nivelIngles}
                            onChange={this.onChangeDropdown} 
                            options={OpcionesDeNivelDeIngles}
                            style={{margin: "0px 11%"}}
                            selection
                            required
                      />
                    </span>
                  </Grid.Column>
                  <Grid.Column>
                    <span className="etiquetas">
                      <label htmlFor="cuatrimestre">Cuatrimestre<br/></label>
                      <Dropdown type="text" 
                            name="cuatrimestre"
                            onChange={this.onChangeDropdown} 
                            options={OpcionesDeCuatrimestre}
                            value={this.state.egresade.cuatrimestre}
                            placeholder='Cuatrimestre'
                            style={{margin: "0px 11%"}}
                            selection
                      />
                    </span>
                  </Grid.Column>
                  <Grid.Column>
                    <span className="etiquetas">
                    <label htmlFor="modulo">Tipo de Curso<br/></label>
                      <Dropdown type="text"
                          name="modulo"
                          placeholder="Tipo de Curso"
                          value={this.state.modulo}
                          onChange={this.onChangeDropdown} 
                          validators={['required']} 
                          options={OpcionesDeTipoDeCurso}
                          value={this.state.egresade.modulo}
                          style={{margin: "0px 11%"}}
                          selection
                      />
                    </span>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                <Grid.Column className="centrarColumnas">
                    <span className="etiquetas">
                      <label htmlFor="esEmpleado">Estado Laboral<br/></label>
                      <Dropdown
                            name="esEmpleado" 
                            placeholder="Estado Laboral"
                            selection 
                            onChange={this.onChangeDropdown} 
                            style={{margin: "0px 11%"}}
                            options={OpcionesDeEstadoLaboral}
                            value={this.state.egresade.esEmpleado}
                      />
                    </span>
                  </Grid.Column>
                  <Grid.Column>
                        <span className="etiquetas">
                          <label htmlFor="nombrePrimerTrabajo">Nombre Primer Empleo<br/></label>
                          <Input type="text" 
                              name="nombrePrimerTrabajo"
                              maxLength="40"                 
                              placeholder="Nombre Primer Empleo" 
                              value={this.state.egresade.nombrePrimerTrabajo} 
                              validators={['matchRegexp:^[A-Za-z]+$']} 
                              errorMessages={['El campo no acepta valores numéricos']} 
                              style={{margin: "0px 15%"}}
                              onChange={this.enCambio} 
                          />
                        </span>
                  </Grid.Column>
                  <Grid.Column>
                    <span className="etiquetas">
                      <label for="añoGraduacion">Año de Graduación<br/></label>
                      <Input type="text"
                          name="añoGraduacion"
                          min={1950}
                          max={2100}
                          pattern="[0-9]*"
                          maxLength="4"  
                          minLength="4"  
                          placeholder="Año"
                          value={this.state.egresade.añoGraduacion}
                          validators={['required','matchRegexp:^[0-9]+$']} 
                          errorMessages={['Este campo es requerido', 'El campo sólo acepta números']} 
                          style={{margin: "0px 15%"}}
                          onChange={this.enCambio}
                      />
                    </span>
                  </Grid.Column>
                  <Grid.Column>
                    <span className="etiquetas">
                      <label htmlFor="linkedin">Enlace de CV en LinkedIn<br/></label>
                      <Input type="url"
                          name="linkedin"
                          placeholder="LinkedIn"
                          value={this.state.egresade.linkedin}
                          validators={['required']} 
                          errorMessages={['Este campo es requerido']} 
                          style={{margin: "0px 15%"}}
                          onChange={this.enCambio}
                        />
                      </span>
                    </Grid.Column>
                  </Grid.Row>
              </Grid>
              <Grid centered rows={1} columns={1}>
                <GridRow>
                <Link to={'/listaEgresades'}><Button className="ui basic negative button" style={{margin: "0px 50px 10px 50px"}}>Cancelar</Button></Link>
                <Confirm
                  header='¿Está seguro que desea guardar los cambios?'
                  content="Si confirma el guardado, será redirigido a la lista principal"
                  open={this.state.abrirModal}
                  cancelButton='Cancelar'
                  confirmButton='Aceptar'
                  onCancel={this.handleCancel}
                  onConfirm={this.handleConfirm}
                />
                <Button className="ui basic positive button" style={{margin: "0px 50px 10px 50px", background: "rgb(129,206,50)"}}>Aceptar</Button>
                </GridRow>
            
              </Grid>            
          </Form>
          {(this.state.exito === false) && (
                <MensajeResultante encabezadoDelMensaje= "Guardado no exitoso" cuerpoDelMensaje="Hubo un error al momento de guardar, intenta de nuevo más tarde" colorDeFondo="red"/>)}
          </div>
      );
          }
  }

  export default EditarEgresades;
