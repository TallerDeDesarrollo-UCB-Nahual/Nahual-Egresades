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
import ConfirmarModal from './ConfirmarModal'

const rutaEstudiantes = 'https://mighty-anchorage-20911.herokuapp.com/api/students'

function obtenerEstadoDepurado(estadoActual){
  var estadoDepurado = estadoActual;
  delete estadoDepurado.nombre; 
  delete estadoDepurado.apellido;
  return estadoDepurado;
}

function prepararDatosAEnviar(estadoActual){
  var nombreConcatenado = estadoActual['name'] + " " + estadoActual['lastName'];
  var estadoDepurado = obtenerEstadoDepurado(estadoActual);
  var nuevoEstado = {
                    nombreCompleto: nombreConcatenado,
                    ...estadoDepurado,
                    nombreDelPrimerTrabajo: null,
                    estaEmpleado: false,
                    nombreDeEstado: 'Egresade'
                  }
  return nuevoEstado;
}

export class EditarEgresades extends Component {
  state = {
    exito: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      egresade: {
        cellphone: ''
      },
      confirmar: false
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
          console.log(this.state.egresade);
        })
        .catch(function (error) {
          console.log(error);
        });  
  } 

  enCambio = (event) =>{
      let nombre = event.target.name;
      let valor = event.target.value;
      this.setState({[nombre]: valor});
  }

  enConfirmacion = (evento) =>{
      evento.preventDefault();
      var estadoAEnviar = prepararDatosAEnviar(this.state);
      axios.post(rutaEstudiantes, estadoAEnviar)
      .then(function (respuesta){
        this.setState({exito: true});  
      }.bind(this))
      .catch(function (error){
        this.setState({exito: false});
      }.bind(this))
      setTimeout(() => { this.setState({ exito: null }); }, 5000);   
  }

  validarEgresade(){
    var egresade = this.state.egresade;
    var result = true;
    const that = this;
    Object.keys(egresade).forEach(function(key,index) {
      if(egresade[key] == null){
        console.log(key);
        result = false;
        that.setState({exito: false});
      }
      // if(Object.keys(elem.clothes).filter(item => item == key).length > 0){
      //   elem.clothes[key] = item[key] ? item[key] : undefined;
      // }
    });
    return result;
  }

  handleButtonClick = () => {
    if(this.validarEgresade()){
      this.setState({ abrirModal: true })
    }
  }

  handleCancel = () => this.setState({ abrirModal: false })

  handleConfirm = () => {
    this.setState({ abrirModal: false })
    window.open("/", "_self");
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
                        <Input className="ui one column stackable center aligned page grid" type="text" 
                          name="nombre"
                          maxLength="20"  
                          placeholder="Nombre" 
                          value={this.state.nombre} 
                          validators={['required','matchRegexp:^[A-Za-z]+$']} 
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
                            value={this.state.apellido} 
                            validators={['required','matchRegexp:^[A-Za-z]+$']} 
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
                          defaultValue={this.state.egresade.celular} //celular
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
                          placeholder="Nodo"
                          selection
                          required 
                          onChange={(evento,{valor})=>{this.setState({nombreNodo:valor})}} 
                          style={{margin: "0px 11%"}}
                          options={OpcionesDeNodo}
                          defaultValue={this.state.egresade.nombreNodo}
                    />
                  </span>
                </Grid.Column>
                <Grid.Column>
                  <span className="etiquetas">
                    <label htmlFor="nivelIngles">Nivel de Ingles<br/></label>
                    <Dropdown type="text"
                          name="nivelIngles"
                          label="Nivel de Inglés"
                          placeholder="Nivel de Ingles"
                          value={this.state.nivelIngles}
                          onChange={(evento,{valor})=>{this.setState({nivelDeIngles:valor})}} 
                          options={OpcionesDeNivelDeIngles}
                          defaultValue={this.state.egresade.nivelIngles}
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
                          onChange={(evento,{valor})=>{this.setState({cuatrimestre:valor})}} 
                          options={OpcionesDeCuatrimestre}
                          value={this.state.cuatrimestre}
                          defaultValue={this.state.egresade.cuatrimestre}
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
                        onChange={(evento,{valor})=>{this.setState({modulo:valor})}} 
                        validators={['required']} 
                        options={OpcionesDeTipoDeCurso}
                        defaultValue={this.state.egresade.modulo}
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
                          required 
                          onChange={(evento,{valor})=>{this.setState({esEmpleado:valor})}} 
                          style={{margin: "0px 11%"}}
                          options={OpcionesDeEstadoLaboral}
                          defaultValue={this.state.egresade.esEmpleado}
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
                            validators={['required','matchRegexp:^[A-Za-z]+$']} 
                            errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']} 
                            style={{margin: "0px 15%"}}
                            onChange={(evento,{valor})=>{this.setState({nombrePrimerTrabajo:valor})}} 
                        />
                      </span>
                </Grid.Column>
                <Grid.Column>
                  <span className="etiquetas">
                    <label htmlFor="anioDeGraduacion">Año de Graduación<br/></label>
                    <Input type="text"
                        name="anioDeGraduacion"
                        min={1950}
                        max={2100}
                        pattern="[0-9]*"
                        maxLength="4"  
                        minLength="4"  
                        placeholder="Año"
                        value={this.state.anioDeGraduacion}
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
                        value={this.state.linkedin}
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
                <Button className="ui basic positive button" style={{margin: "0px 50px 10px 50px", background: "rgb(129,206,50)"}}>Aceptar</Button>
                <Button onClick={this.handleButtonClick}>Aceptar</Button>
                <Confirm
                  header='This is a large confirm'
                  open={this.state.abrirModal}
                  onCancel={this.handleCancel}
                  onConfirm={this.handleConfirm}
                />
                  {/* <ConfirmarModal egresade={this.state.egresade} open={this.state.abrirModal} style={{margin: "0px 50px 10px 50px", background: "rgb(129,206,50)"}}/> */}
                  <Link to={'/'}><Button className="ui basic negative button" style={{margin: "0px 50px 10px 50px"}}>Cancelar</Button></Link>
                </GridRow>
            
              </Grid>
              
              {/* <Button className="ui basic positive button" style={{margin: "0px 50px 10px 50px", background: "rgb(129,206,50)"}}>Aceptar</Button>
              {(this.state.exito === true) && (
                <MensajeResultante encabezadoDelMensaje= "Registro exitoso" cuerpoDelMensaje="Puede volver a registrar" colorDeFondo="green"/>)} */}
          </Form>
          {(this.state.exito === false) && (
                <MensajeResultante encabezadoDelMensaje= "Guardado no exitoso" cuerpoDelMensaje="Tienes que llenar todos los campos" colorDeFondo="red"/>)}
          </div>
      )
  }
}


export default EditarEgresades
