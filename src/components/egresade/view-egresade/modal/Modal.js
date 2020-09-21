import React, { Component, Fragment } from 'react';
import { Button, Image, Modal, Grid, GridRow, Icon, Header, Segment, Loader, Dimmer} from 'semantic-ui-react';
import './Modal.css';
import LogoNahual from '../../../../public/images/logo-proyecto-nahual.webp';
import EgresadeData from "./EgresadeData";
import SubjectData from "./SubjectData";
import axios from "axios";

class ModalExampleModal extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  getGraduateAPI() {
    const API_URL = `https://mighty-anchorage-20911.herokuapp.com/api/students/`;
    axios
      .get(`${API_URL}${this.props.graduateId}`)
      .then(response => {
        this.setState({
          graduate: response.data.response
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setOpen(state) {
    this.setState({
      open: state
    });
  }

  render() {
    return (
      <Modal
        open={this.state.open}
        onClose={() => this.setOpen(false)}
        onOpen={() => this.setOpen(true)}
        size="small"
        closeIcon
        trigger={
          <Button onClick={() => (this.getGraduateAPI(this.props.graduateId))}>
            <i className="eye icon"></i>
            <label className="icon-text">Ver</label>
          </Button>}
      >
        {
          this.state.graduate ?
            <Fragment>
              <Modal.Header>
                <Grid columns='equal'>
                  <Grid.Column>
                    <Image src={LogoNahual} size='small' />
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <h1>{this.state.graduate.fullName}</h1>
                  </Grid.Column>
                </Grid>
              </Modal.Header>

              <Modal.Content image>
                <Grid columns='equal'>
                  <Grid.Row>
                    <Grid.Column>
                      <Image src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
                    </Grid.Column>
                    <Grid.Column width={1}>
                    </Grid.Column>
                    <Grid.Column width={9}>
                      <EgresadeData graduate={this.state.graduate} />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <SubjectData graduate={this.state.graduate} />
                    </Grid.Column>
                  </Grid.Row>
                  <GridRow>
                    <Grid.Column>
                      <Header as='h3'> <Icon name='linkedin' />Linkedin</Header>
                      <Grid columns='equal'>
                        <Grid.Column></Grid.Column>
                        <Grid.Column width={15}><a className="card-lightBlue" href={this.state.graduate} target="_blank">• {this.state.graduate.linkedin} </a></Grid.Column>
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
              <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Segment>
        }
        <Modal.Actions>
          <Button color='grey' onClick={() => this.setOpen(false)}>
            Atras
        </Button>
          <Button color='green' onClick={() => this.setOpen(false)}>
            Enviar correo
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ModalExampleModal