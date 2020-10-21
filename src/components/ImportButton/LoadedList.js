import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Table } from 'semantic-ui-react'

export default class LoadedList extends Component {

  render() {
    return (

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre y Apellido</Table.HeaderCell>
            <Table.HeaderCell>Fecha de Nacimiento</Table.HeaderCell>
            <Table.HeaderCell>Mail</Table.HeaderCell>
            <Table.HeaderCell>Numero de Celular</Table.HeaderCell>
            <Table.HeaderCell>NODO</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.json.map((fila) => (
            <Table.Row key={fila.fullName}>
              <Table.Cell >{fila["nombreCompleto"]}</Table.Cell>
              <Table.Cell>{fila["fechaNacimiento"]}</Table.Cell>
              <Table.Cell>{fila["correo"]}</Table.Cell>
              <Table.Cell>{fila["celular"]}</Table.Cell>
              <Table.Cell>{fila["nombreNodo"]}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}