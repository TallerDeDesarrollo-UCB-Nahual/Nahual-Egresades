import React, { Component } from 'react';
import 'semantic-ui-css/semantic.css';
import {Dropdown, Button, Grid, Message} from 'semantic-ui-react';
import {Form, Input } from 'semantic-ui-react-form-validator';
import '../../public/stylesheets/Register.css';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom'
import axios  from 'axios';

import {NodeOptions} from './selection-options/NodeOptions.js';
import {CourseTypeOptions} from './selection-options/CourseTypeOptions.js';
import {QuarterOptions} from './selection-options/QuarterOptions.js';
import {EnglishLevelOptions} from './selection-options/EnglishLevelOptions.js';

import {ResultMessage} from './messageType/ResultMessage.js';

const emptyState ={
  name: '',
  lastName: '',
  birthDate: '',
  cellphone: '',
  mail: '',
  nodeName: NodeOptions[0].value,
  graduationYear: '', 
  quarter: QuarterOptions[0].value, 
  module: CourseTypeOptions[0].value,
  englishLevel: EnglishLevelOptions[0].value,
  linkedin: ''
}

const studentsURL = 'https://mighty-anchorage-20911.herokuapp.com/api/students'

function getDepuredState(actualState){
  var depuredState = actualState;
  delete depuredState.name; 
  delete depuredState.lastName;
  return depuredState;
}

function prepareDataToSend(actualState){
  var concatedName = actualState['name'] + " " + actualState['lastName'];
  var depuredState = getDepuredState(actualState);
  var newState = {
                    fullName: concatedName,
                    ...depuredState,
                    firstJobName: null,
                    isEmployed: false,
                    statusName: 'Egresade'
                  }
  return newState;
}

export class RegisterGraduates extends Component {
    state = {
        success: null
    };
    constructor(props) {
        super(props);
        this.state = emptyState;
      }
    
    onChange = (event) =>{
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }
    

    onSubmit = (event) =>{
        event.preventDefault();
        var stateToSend = prepareDataToSend(this.state);
        axios.post(studentsURL, stateToSend)
        .then(function (response){
          this.setState({success: true});  
        }.bind(this))
        .catch(function (error){
          this.setState({success: false});
        }.bind(this))
        setTimeout(() => { this.setState({ success: null }); }, 5000);   
        this.setState(emptyState);
    }

    render() {
        return (
           <div className="backform">
                <Form id="myForm" onSubmit={this.onSubmit} className="ui form">
                  <Grid divided='vertically' stackable columns={2}>
                    <Grid.Row >
                      <Grid.Column className="centerColumns">
                        <span className="labels">
                          <label for="name">Nombre<br/></label>
                          <Input class="ui one column stackable center aligned page grid" type="text" 
                            name="name"
                            maxLength="20"  
                            placeholder="Nombre" 
                            value={this.state.name} 
                            validators={['required','matchRegexp:^[A-Za-z]+$']} 
                            errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']} 
                            style={{margin: "0px 15%"}}
                            onChange={this.onChange}
                          />
                        </span>
                      </Grid.Column>
                      <Grid.Column>
                        <span className="labels">
                          <label for="lastName">Apellidos<br/></label>
                          <Input type="text" 
                              name="lastName"
                              maxLength="30"                 
                              placeholder="Apellido" 
                              value={this.state.lastName} 
                              validators={['required','matchRegexp:^[A-Za-z]+$']} 
                              errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']} 
                              style={{margin: "0px 15%"}}
                              onChange={this.onChange}
                          />
                        </span>
                      </Grid.Column>
                      <Grid.Column>
                        <span className="labels">
                        <label for="birthDate">Fecha de Nacimiento<br/></label>
                        <Input type="date" 
                            name="birthDate" 
                            pattern="[0-9]*" 
                            placeholder="Fecha de Nacimiento" 
                            value={this.state.birthDate} 
                            validators={['required']} 
                            errorMessages={['Este campo es requerido']} 
                            style={{margin: "0px 15%"}}
                            min="1960-01-01"
                            max="2020-01-01"
                            onChange={this.onChange}
                          />
                        </span>
                      </Grid.Column>
                      <Grid.Column>
                        <span className="labels">
                          <label for="cellphone">Teléfono de Contacto<br/></label>
                          <Input type="text" 
                            maxLength="10"
                            name="cellphone" 
                            placeholder="Celular" 
                            value={this.state.cellphone} 
                            validators={['required','matchRegexp:^[0-9]+$']} 
                            errorMessages={['Este campo es requerido', 'El campo no acepta sólo numéricos']} 
                            style={{margin: "0px 15%"}}
                            onChange={this.onChange}
                          />
                        </span>
                      </Grid.Column>
                      <Grid.Column>
                        <span className="labels">
                        <label for="mail">Correo Electrónico<br/></label>
                          <Input type="email" 
                            name="mail"
                            placeholder="Correo Electrónico"
                            value={this.state.mail}
                            validators={['required']} 
                            errorMessages={['Este campo es requerido']} 
                            style={{margin: "0px 15%"}}
                            onChange={this.onChange}
                          />
                        </span>
                      </Grid.Column>
                    </Grid.Row>
                <Grid.Row stackable columns={2}>
                  <Grid.Column className="centerColumns">
                    <span className="labels">
                      <label for="nodeName">Nodo<br/></label>
                      <Dropdown
                            name="nodeName" 
                            placeholder="Nodo"
                            value={this.state.nodeName} 
                            selection
                            required 
                            onChange={(e,{value})=>{this.setState({nodeName:value})}} 
                            errorMessages={['Este campo es requerido']}
                            style={{margin: "0px 11%"}}
                            options={NodeOptions}
                            defaultValue={NodeOptions[0].value}
                      />
                    </span>
                  </Grid.Column>
                  <Grid.Column>
                    <span className="labels">
                      <label for="englishLevel">Nivel de Ingles<br/></label>
                      <Dropdown type="text"
                            name="englishLevel"
                            label="Nivel de Inglés"
                            placeholder="Nivel de Ingles"
                            value={this.state.englishLevel}
                            onChange={(e,{value})=>{this.setState({englishLevel:value})}} 
                            options={EnglishLevelOptions}
                            defaultValue={EnglishLevelOptions[0].value}
                            style={{margin: "0px 11%"}}
                            selection
                            required
                      />
                    </span>
                  </Grid.Column>
                  <Grid.Column>
                    <span className="labels">
                      <label for="quarter">Cuatrimestre<br/></label>
                      <Dropdown type="text" 
                            name="quarter"
                            onChange={(e,{value})=>{this.setState({quarter:value})}} 
                            options={QuarterOptions}
                            value={this.state.quarter}
                            placeholder='Cuatrimestre'
                            style={{margin: "0px 11%"}}
                            selection
                      />
                    </span>
                  </Grid.Column>
                  <Grid.Column>
                    <span className="labels">
                    <label for="module">Tipo de Curso<br/></label>
                      <Dropdown type="text"
                          name="module"
                          placeholder="Tipo de Curso"
                          value={this.state.module}
                          onChange={(e,{value})=>{this.setState({module:value})}} 
                          validators={['required']} 
                          errorMessages={['Este campo es requerido']} 
                          options={CourseTypeOptions}
                          defaultValue={CourseTypeOptions[0].value}
                          style={{margin: "0px 11%"}}
                          selection
                      />
                    </span>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row stackable columns={2}>
                  <Grid.Column>
                    <span className="labels">
                      <label for="graduationYear">Año de Graduación<br/></label>
                      <Input type="number"
                          name="graduationYear"
                          min={1950}
                          max={2100}
                          pattern="[0-9]*"
                          maxLength="4"  
                          minLength="4"  
                          placeholder="Año"
                          value={this.state.graduationYear}
                          validators={['required','matchRegexp:^[0-9]+$']} 
                            errorMessages={['Este campo es requerido', 'El campo no acepta sólo numéricos']} 
                          style={{margin: "0px 15%"}}
                          onChange={this.onChange}
                      />
                    </span>
                  </Grid.Column>
                  <Grid.Column>
                    <span className="labels">
                      <label for="linkedin">Enlace de CV en LinkedIn<br/></label>
                      <Input type="url"
                          name="linkedin"
                          placeholder="LinkedIn"
                          value={this.state.linkedin}
                          validators={['required']} 
                          errorMessages={['Este campo es requerido']} 
                          style={{margin: "0px 15%"}}
                          onChange={this.onChange}
                      />
                    </span>
                  </Grid.Column>
                </Grid.Row>
                </Grid>
                <Grid centered columns={2}>
                  <Grid.Column textAlign="center">
                    <Button className="ui basic positive button" style={{margin: "0px 50px 10px 50px", background: "rgb(129,206,50)"}}>Aceptar</Button>
                    <Link to={'/'}><Button className="ui basic negative button" style={{margin: "0px 50px 10px 50px"}}>Cancelar</Button></Link>
                  </Grid.Column>
                </Grid>
                
                
                {(this.state.success === true) && (
                  <ResultMessage messageHeader= "Registro exitoso" messageBody="Puede volver a registrar" colorBg="green"/>)}
                {(this.state.success === false) && (
                  <ResultMessage messageHeader= "Oops, algo fue mal" messageBody="Intentelo nuevamente" colorBg="red"/>)}
            </Form>
           </div>
        )
    }
}


export default RegisterGraduates
