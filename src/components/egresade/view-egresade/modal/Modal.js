import React, { Component } from 'react';
import { Button, Image, Modal, Grid, GridRow, Icon, Header } from 'semantic-ui-react';
import './Modal.css';
import LogoNahual from '../../../../images/proyecto-nahual.webp';
import EgresadeData from "./EgresadeData";
import SubjectData from "./SubjectData";

class ModalExampleModal extends Component {
  constructor(graduateId) {
    super(graduateId);
    this.state = {
      open: false
    };
  }

  getGraduateAPI() {
    const API_URL = `https://mighty-anchorage-20911.herokuapp.com/api/students/`;
    fetch(`${API_URL}${this.graduateId}`)
      .then(response => {
        this.setState({
          graduate: response.data.response
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setOpen(state){
    this.setState({
      open: state
    });
  }


  render() {
    console.log(this);
    console.log(this.graduateId);
  return (
    <Modal
      open={this.state.open}
      onClose={() => this.setOpen(false)}
      onOpen={() => this.setOpen(true)}
      size="small"
      closeIcon
      trigger={
        <Button onClick={() => (this.getGraduateAPI(this.graduateId))}>
          <i className="eye icon"></i>
          <label className="icon-text">Ver</label>
        </Button>}
        
    >
      <Modal.Header>
        <Grid columns='equal'>
          <Grid.Column>
            <Image src={LogoNahual} size='small' />
          </Grid.Column>
          <Grid.Column width={11}>
            {/* <h1>{this.state.graduate.fullName}</h1>  */}
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
              {/* <EgresadeData graduate={this.state.graduate} /> */}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {/* <SubjectData graduate={this.state.graduate} /> */}
            </Grid.Column>
          </Grid.Row>
          <GridRow>
            <Grid.Column>
              <Header as='h3'> <Icon name='linkedin' />Linkedin</Header>
              <Grid columns='equal'>
                <Grid.Column></Grid.Column>
                {/* <Grid.Column width={15}><a className="card-lightBlue" href={this.state.graduate} target="_blank">• {this.state.graduate.linkedin} </a></Grid.Column> */}
              </Grid>

            </Grid.Column>
          </GridRow>
        </Grid>
      </Modal.Content>

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