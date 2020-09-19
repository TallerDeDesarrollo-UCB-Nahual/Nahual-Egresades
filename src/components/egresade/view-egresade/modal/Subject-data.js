import React from "react";
import { Icon, Grid, Header } from "semantic-ui-react";

function SubjectData({ graduate }) {
  return (
    <Grid.Row>
      <Grid.Column>
        <Header as='h3'> <Icon name='graduation' />Cursos Realizados</Header>
        <Grid columns='equal'>
        <Grid.Column/>
          <Grid.Column floated="right" width={11}>
            <Icon color='green' name='check' /> {graduate.graduate.module}
          </Grid.Column>

          <Grid.Column floated="left" width={4}>
            {graduate.graduate.graduationYear}
          </Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid.Row>
  );
}

export default SubjectData;
