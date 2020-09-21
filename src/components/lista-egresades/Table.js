import React, { Component } from 'react'
import { Icon, Label, Button, Menu, Table } from 'semantic-ui-react'
import Modal from '../egresade/view-egresade/Modal'
import '../../public/stylesheets/Table.css';
import filter from '../../public/images/filter.png';
import search from '../../public/images/search.png'
import { Link } from 'react-router-dom'
import ImportModal from '../ImportButton/ImportModal'

export default class Nahual_Table extends Component {

  constructor() {
    super();
    this.state = {
      api: []
    }
  }

  componentDidMount() {
    fetch(`https://mighty-anchorage-20911.herokuapp.com/api/students/`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        let dat = res;
        this.setState({ api: dat.response })
      })
  }
  openModal() {
    this.setState({ openModal: true });
  }

  render() {
    return (
      <div>
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
            <div className="register" style={{color: "black"}}>
              <Link to={'/'}>
                <Icon name='upload' color='green'/>
                <ImportModal/>
                
              </Link>
            </div>
            <div className= "register" style={{color: "black"}}>
              <Link to={'/registrar'}>
                <Button basic style={{color: "black",border:'1px solid #6D5BD0'}}> 
                <Icon name='plus square' color='green'/>
                  Registrar 
                </Button>
              </Link>
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
              {this.state.api.map((value) => (
                <Table.Row>
                  <Table.Cell className="table-border">
                    <Label className="name">{value.fullName}</Label><br></br>
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

                    <Modal graduateId={value.id} open={this.state.openModal} />
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