import React from "react";
import { Icon, Grid, Header } from "semantic-ui-react";

function SubjectData({ graduate }) {
  return (
    <Grid.Row>
      <Grid.Column>
        <Header as='h3'> <Icon name='graduation' />Cursos Realizados</Header>
        <Grid columns='equal'>
          <Grid.Column />
          <Grid.Column floated="right" width={11}>
            <Icon color='green' name='check' /> <span className="card-green">{graduate.graduate.module}</span>
          </Grid.Column>

          <Grid.Column floated="left" width={4}>
            <span className="card-green">{graduate.graduate.graduationYear}</span>
          </Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid.Row>
  );
}

export default SubjectData;
