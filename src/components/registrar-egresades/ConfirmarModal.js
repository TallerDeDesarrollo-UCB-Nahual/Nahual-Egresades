import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Modal, Label } from 'semantic-ui-react'
import '../../public/stylesheets/ConfirmarModal.css';
import axios  from 'axios';

class ConfirmarModal extends Component {
    
    constructor(){
        super();
        this.state = {
            abierto: false
        }
    }
    setAbierto(state) {
        this.setState({
            abierto:state
        });
    }
    
    guardarEgresade(){
        axios.post(`http://fathomless-falls-62194.herokuapp.com/api/egresades/`, this.props.egresade.id, this.props.egresade)
        .then(function (respuesta){
            console.log(respuesta);
        })
    }

    onSubmit(){
        console.log("Guardar")
        console.log(this.props.egresade)
        this.guardarEgresade();
    }

    render(){
        return (
          <div><Modal
            centered={true}
            open={this.state.abierto}
            onClose={()=>this.setAbierto(false)}
            onOpen={()=>this.setAbierto(true)}
            trigger={<Button className="ui basic positive button">Aceptar</Button>}>
            
            <Modal.Header>Confirmar</Modal.Header>
            <Modal.Content color="white">
                <Modal.Description>
                    <label className="descripcion">¿Esta seguro que desea guardar los cambios?</label>
                </Modal.Description>
            </Modal.Content>  
            <Modal.Actions>
              <Button color="green" onClick={()=>this.onSubmit()}>Guardar</Button>
              <Button color="red" onClick={()=>this.setAbierto(false)}>Cancelar</Button>               
            </Modal.Actions>
          </Modal>
          </div>
        )}

}

export default ConfirmarModal;