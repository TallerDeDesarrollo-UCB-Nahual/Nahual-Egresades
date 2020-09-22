import React, {Component} from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Table } from 'semantic-ui-react'



export default class LoadedList extends Component{

    render(){
      return (
       
         <Table celled>
         <Table.Header>
           <Table.Row>
             <Table.HeaderCell>Nombre y Apellido</Table.HeaderCell>
             <Table.HeaderCell>Fecha de Nacimiento</Table.HeaderCell>
             <Table.HeaderCell>Mail</Table.HeaderCell>
             <Table.HeaderCell>Numero de Celular</Table.HeaderCell>
             <Table.HeaderCell>NODO</Table.HeaderCell>
             <Table.HeaderCell>Linkedin</Table.HeaderCell>

           </Table.Row>
         </Table.Header>
     
         <Table.Body>
         {this.props.json.map(item => (
           <Table.Row>
            <Table.Cell >{item["fullName"]}</Table.Cell>
            <Table.Cell>{item["birthDate"]}</Table.Cell>
            <Table.Cell>{item["mail"]}</Table.Cell>
            <Table.Cell>{item["cellphone"]}</Table.Cell>
            <Table.Cell>{item["nodeName"]}</Table.Cell>

           </Table.Row>
           ))}
         </Table.Body>
       </Table>
      )
    }
}