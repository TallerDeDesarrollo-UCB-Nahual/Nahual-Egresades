import React from "react";
import { Icon, Grid, Header } from "semantic-ui-react";
import Course from "./Course";

function SubjectData({ graduate }) {
  return (
    <Grid.Row>
      <Grid.Column>
        <Header as='h3'> <Icon name='graduation'/>Cursos Realizados</Header>
        <Grid>
          <Grid.Row>
            {graduate.moduleCompleted && graduate.moduleCompleted.map(
              (module, index) => (
                <Course module={module} key={index}/>
              )
            )}
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid.Row>
  );
}

export default SubjectData;
