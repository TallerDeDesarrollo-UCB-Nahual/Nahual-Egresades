import React from "react";
import { Icon, Grid, Header } from "semantic-ui-react";

function InformacionDelCurso({ egresade }) {
  return (
    <Grid.Row>
      <Grid.Column>
        <Header as='h3'> <Icon name='graduation' />Módulo Cursado</Header>
        <Grid columns='equal'>
          <Grid.Column />
          <Grid.Column floated="right" width={11}>
            <Icon color='green' name='check' /> <span className="card-green">{egresade.modulo}</span> 
          </Grid.Column>

          <Grid.Column floated="left" width={4}>
            <span className="card-green">{egresade.añoGraduacion}</span>
          </Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid.Row>
  );
}

export default InformacionDelCurso;
