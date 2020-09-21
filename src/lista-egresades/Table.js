import React, { Component } from 'react'
import { Icon, Label, Button, Menu, Table } from 'semantic-ui-react';
import Modal from '../components/egresade/view-egresade/modal/Modal';
import Navbar from './Navbar';
import './Table.css';
import filter from '../images/filter.png';
import imp from '../images/imp.png';
import search from '../images/search.png'

export default class Nahual_Table extends Component {

  constructor() {
    super();
    this.state = {
      openModal: false,
      egresades: [
        {
          "fullName": "clodomiro saavedra perez",
          "statusName": "Egresade",
          "birthDate": "1995-02-01",
          "mail": "clodo.saavedra@gmail.com",
          "cellphone": 79840584,
          "nodeName": "CABA",
          "graduationYear": 2020,
          "quarter": 1,
          "englishLevel": "Basico",
          "firstJobName": "Tsoft",
          "linkedin": "https://www.linkedin.com/clodomiro",
          "campus": "buenos aires",
          "isEmployed": true,
          "module": "Testing funcional"
        },
        {
          "fullName": "Test 2",
          "statusName": "Egresade",
          "birthDate": "1995-02-01",
          "mail": "clodo.saavedra@gmail.com",
          "cellphone": 79840584,
          "nodeName": "CABA",
          "graduationYear": 2020,
          "quarter": 1,
          "englishLevel": "Intermedio",
          "firstJobName": "Tsoft",
          "linkedin": "https://www.linkedin.com/clodomiro",
          "campus": "buenos aires",
          "isEmployed": true,
          "module": "Testing funcional"
        },
        {
          "fullName": "Test 3",
          "statusName": "Egresade",
          "birthDate": "1995-06-01",
          "mail": "clodo.saavedra@gmail.com",
          "cellphone": 79840584,
          "nodeName": "CABA",
          "graduationYear": 2020,
          "quarter": 1,
          "englishLevel": "Intermedio",
          "firstJobName": "Tsoft",
          "linkedin": "https://www.linkedin.com/clodomiro",
          "campus": "buenos aires",
          "isEmployed": true,
          "module": "Testing Automation"
        }
      ]
    }
  }

  openModal() {
    this.setState({ openModal: true });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div className="table">
          <p className="title">Lista de Egresades</p>
          <div className="line"></div>

          <div className="table-menu">
            <div className="filter">
              <img src={filter}></img>
              <label className="filter1"> Filtrar</label>
            </div>
            <div className="search">
              <img src={search} className="search-icon"></img>
              <input className="search-input"></input>
            </div>
            <div className="import">
              <img src={imp} className="menu-icon"></img>
              <label className="import2"> Importar</label>
            </div>
          </div>
          <br /><br />
          <Table celled className="table-card">
            <Table.Header>
              <Table.Row >
                <Table.HeaderCell className="table-header">Nombre y Apellido</Table.HeaderCell>
                <Table.HeaderCell className="table-header">Sede</Table.HeaderCell>
                <Table.HeaderCell className="table-header">Modulo Cursado</Table.HeaderCell>
                <Table.HeaderCell className="table-header">Acción</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.egresades.map((value, i) => (
                <Table.Row>
                  <Table.Cell className="table-border">
                    <Label className="name" >{value.fullName}</Label><br></br>
                    <Label className="mail">{value.mail}</Label>
                  </Table.Cell >
                  <Table.Cell className="table-border">
                    <Label className="card-blue">• {value.nodeName}</Label>
                  </Table.Cell>
                  <Table.Cell className="table-border">
                    <Label className="card-green">• {value.module}</Label></Table.Cell>

                  <Table.Cell colSpan="3" className="table-border">
                    <Button className="view-button">
                      <i className="edit icon"></i>
                      <label className="icon-text">Editar</label>
                    </Button>

                    <Modal graduate={value.id} open={this.state.openModal} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='4' className="no-border">
                  <Menu floated='right' pagination>
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
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      </div>)
  }
}