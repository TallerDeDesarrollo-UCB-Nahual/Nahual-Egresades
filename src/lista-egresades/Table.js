import React, { Component } from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import Navbar from './Navbar';
import './Table.css';

export default class Nahual_Table extends Component{

render() {
  return (
  <div>
    <Navbar></Navbar>
    <div className="table">
    <p className="title">Lista de Egresades</p>
    <div className="line"></div>
      <Table celled className="table-card">
        <Table.Header className="table-header">
          <Table.Row>
            <Table.HeaderCell>Nombre y Apellido</Table.HeaderCell>
            <Table.HeaderCell>Sede</Table.HeaderCell>
            <Table.HeaderCell>Modulo Cursado</Table.HeaderCell>
            <Table.HeaderCell>Accion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              Augusto Gaffuri<br></br>
              <Label>example@mail.com</Label>
            </Table.Cell>
            <Table.Cell>Maximo Paz</Table.Cell>
            <Table.Cell>
                <Label>Testing funcional</Label></Table.Cell>
            <Table.Cell colSpan="3">
              <Label>Editar</Label>
              <Label>Ver</Label>
            </Table.Cell>
          </Table.Row>
      
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='4'>
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