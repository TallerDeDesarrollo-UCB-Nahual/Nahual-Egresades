import React from 'react'
import { Button, Header, Image, Modal, Grid } from 'semantic-ui-react'
import see from '../../../../images/see.png';
import LogoNahual from '../../../../images/proyecto-nahual.webp'
import BodyModal from './Body-modal';

function ModalExampleModal(graduate) {
  const [open, setOpen] = React.useState(false)
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      size="small"
      closeIcon
      trigger={<Button className="button">
        <img src={see} className="icon"></img>
        <label className="icon-text">Ver</label>
      </Button>}
    >
          <Modal.Header>
          <Grid>
          <Image src={LogoNahual} size='small' />
          <h1>{graduate.graduate.fullName}</h1>
          </Grid>
        </Modal.Header>

      <Modal.Content image>
        <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />

        <BodyModal graduate ={graduate}/>

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