import React from 'react'
import EgresadeData from "./Egresade-data";
import SubjectData from "./Subject-data";
import { Modal,Grid } from 'semantic-ui-react'

const BodyModal = ({graduate}) => {
  return (
    <>

      <Modal.Content>
        <Grid divided='vertically'>
          <EgresadeData graduate={graduate} />
          {<SubjectData graduate={graduate} />}
        </Grid>
      </Modal.Content>
    </>
  )
}

export default BodyModal
