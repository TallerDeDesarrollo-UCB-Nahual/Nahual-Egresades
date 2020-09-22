import React, { Component } from 'react'
import { Icon, Label, Button, Message, Table } from 'semantic-ui-react'
import Modal from '../egresade/view-egresade/Modal'
import '../../public/stylesheets/Table.css';
import filter from '../../public/images/filter.png';
import search from '../../public/images/search.png'
import { Link } from 'react-router-dom'
import ImportModal from '../ImportButton/ImportModal'


class Nahual_Table extends Component {
  constructor() {
    super();
    this.state = {
      api: [],
      statusMessage: "",
      showStatusMessage: false
    }
    this.onSuccessfulRegistration = this.onSuccessfulRegistration.bind(this)
  }

  onSuccessfulRegistration(count) {
    if (count > 0) {
      this.setState({
        statusMessage: "Se realizo el registro de " + count + " egresados exitosamente.",
        showStatusMessage: true
      });
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

  handleDismiss = () => {
    this.setState({ showStatusMessage: false })
  }

  render() {
    return (
      <div>
        <div className="table">
          <p className="title">Lista de Egresades</p>
          <div className="line"></div>
          <div>
            {this.state.showStatusMessage ?
              <Message
                positive
                onDismiss={this.handleDismiss}
                header='Registro exitoso!'
                content={this.state.statusMessage}
              ></Message>
              :
              <p></p>
            }
          </div>

          <div className="table-menu">
            {/* <div className="filter">
              <img src={filter}></img>
              <label className="filter1"> Filtrar</label>
            </div> 
            <div className="search">
              <img src={search} className="search-icon"></img>
              <input className="search-input"></input>
            </div>*/}
            <div className="register" style={{ color: "black" }}>
              <Link to={'/'}>
                <ImportModal onClick={this.onSuccessfulRegistration} />
              </Link>
            </div>
            <div className="register" style={{ color: "black" }}>
              <Link to={'/registrar'}>
                <Button basic style={{ color: "black", border: '1px solid #6D5BD0' }}>
                  <Icon name='plus square' color='green' />
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
                <Table.HeaderCell className="table-header">Nodo</Table.HeaderCell>
                <Table.HeaderCell className="table-header">Modulo Cursado</Table.HeaderCell>
                <Table.HeaderCell className="table-header">Acción</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.api.map((value) => (
                <Table.Row key={value.id} >
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
                    {/* <Button className="view-button">
                      <i className="edit icon"></i>
                      <label className="icon-text">Editar</label>
                    </Button> */}

                    <Modal graduateId={value.id} open={this.state.openModal} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='4' className="no-border">
                  {/* <Menu floated='right' pagination>
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
                  </Menu> */}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>

        </div>
      </div>)

  }

}
export default Nahual_Table;