import React, { Component, Fragment } from 'react';
import { Button, Image, Modal, Grid, GridRow, Icon, Header, Segment, Loader, Dimmer } from 'semantic-ui-react';
import '../../../public/stylesheets/Modal.css';
import LogoNahual from '../../../public/imagenes/logo-proyecto-nahual.webp';
import InformacionDelEgresade from "./InformacionDelEgresade";
import InformacionDelCurso from "./InformacionDelCurso";
import axios from "axios";
import userIcon from '../../../public/imagenes/user-icon.jpeg'

class ModalExampleModal extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  obtenerEgresadeDeAPI() {
    const API_URL = `https://nahual-datos-estudiantes.herokuapp.com/api/egresades/`;
    axios
      .get(`${API_URL}${this.props.egresadeId}${"/DTO"}`)
      .then(response => {
        this.setState({
          egresade: response.data.response
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  abrirModal(estado) {
    this.setState({
      open: estado
    });
  }

  render() {
    return (
      <Modal
        open={this.state.open}
        onClose={() => this.abrirModal(false)}
        onOpen={() => this.abrirModal(true)}
        size="small"
        closeIcon
        trigger={
          <Button onClick={() => (this.obtenerEgresadeDeAPI(this.props.egresadeId))}>
            <i className="eye icon"></i>
            <label className="icon-text">Ver</label>
          </Button>}
      >
        {
          this.state.egresade ?
            <Fragment>
              <Modal.Header>
                <Grid columns='equal'>
                  <Grid.Column>
                    <Image src={LogoNahual} size='small' />
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <h1>{this.state.egresade.nombre} {this.state.egresade.apellido}</h1>
                  </Grid.Column>
                </Grid>
              </Modal.Header>

              <Modal.Content image>
                <Grid columns='equal'>
                  <Grid.Row>
                    <Grid.Column>
                      <img src={userIcon}></img>
                    </Grid.Column>

                    <Grid.Column width={9}>
                      <InformacionDelEgresade egresade={this.state.egresade} />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <InformacionDelCurso egresade={this.state.egresade} />
                    </Grid.Column>
                  </Grid.Row>
                  <GridRow>
                    <Grid.Column>
                      <Header as='h3'> <Icon name='linkedin' />Linkedin</Header>
                      <Grid columns='equal'>
                        <Grid.Column></Grid.Column>
                        <Grid.Column width={15}><a className="card-lightBlue" href={this.state.egresade} target="_blank" rel="noopener noreferrer">• {this.state.egresade.linkedin} </a></Grid.Column>
                      </Grid>

                    </Grid.Column>
                  </GridRow>
                </Grid>
              </Modal.Content>
            </Fragment>
            : <Segment>
              <Dimmer active inverted>
                <Loader inverted>Cargando...</Loader>
              </Dimmer>
              <Image src='https://react.semantic-ui.com/imagenes/wireframe/short-paragraph.png' />
            </Segment>
        }
        <Modal.Actions>
          <Button onClick={() => this.abrirModal(false)}>
            Cerrar
        </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ModalExampleModal