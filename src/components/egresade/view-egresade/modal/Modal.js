import React from 'react';
import { Button, Image, Modal, Grid, GridRow, Icon, Header } from 'semantic-ui-react';
import './Modal.css';
import LogoNahual from '../../../../images/proyecto-nahual.webp';
import EgresadeData from "./Egresade-data";
import SubjectData from "./Subject-data";

function ModalExampleModal(graduate) {
  const [open, setOpen] = React.useState(false)
  console.log(graduate);
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      size="small"
      closeIcon
      trigger={
        <Button>
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
            <h1>{graduate.graduate.fullName}</h1>
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
              <EgresadeData graduate={graduate} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <SubjectData graduate={graduate} />
            </Grid.Column>
          </Grid.Row>
          <GridRow>
            <Grid.Column>
              <Header as='h3'> <Icon name='linkedin' />Linkedin</Header>
              <Grid columns='equal'>
                <Grid.Column></Grid.Column>
                <Grid.Column width={15}><a className="card-lightBlue" href={graduate.graduate.linkedin} target="_blank">• {graduate.graduate.linkedin} </a></Grid.Column>
              </Grid>



            </Grid.Column>
          </GridRow>
        </Grid>
      </Modal.Content>

      <Modal.Actions>
        <Button color='grey' onClick={() => setOpen(false)}>
          Atras
        </Button>
        <Button color='green' onClick={() => setOpen(false)}>
          Enviar correo
          </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleModal