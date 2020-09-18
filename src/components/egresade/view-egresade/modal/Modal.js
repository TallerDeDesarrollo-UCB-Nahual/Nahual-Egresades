import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import see from '../../../../images/see.png';
import LogoNahual from '../../../../images/proyecto-nahual.webp'

function ModalExampleModal(props) {
  const [open, setOpen] = React.useState(false)
  console.log(props);
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


      <Modal.Header >
        <span><Image src={LogoNahual} size='small' />
        <h1>{props.name}</h1>
        </span>

      </Modal.Header>
      <Modal.Content image>
        <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <p>
            We've found the following gravatar image associated with your e-mail
            address. My age is {props.age}
          </p>
          <p>Is it okay to use this photo? {props.message}</p>

        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope

        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleModal