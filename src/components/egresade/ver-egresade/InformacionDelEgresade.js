import React from "react";
import { Form, Input, Icon, Item } from "semantic-ui-react";
import '../../../public/stylesheets/Modal.css';

function InformacionDelEgresade({ egresade }) {
  return (
    <Item.Group>
      <Item>
        <Item.Content verticalAlign='middle'>

          <Item.Description>
            <Form id="form-data">
              
                <Form.Field inline>
                  <label><Icon name='mail outline' /><span className="title-data">Correo:</span></label>
                  <Input> {egresade.mail} </Input>
                </Form.Field>

                <Form.Field inline>
                <label><Icon name='call' /><span className="title-data">Telefono:</span></label>
                  <Input > {egresade.cellphone} </Input>
                </Form.Field>

                <Form.Field inline>
                  <label><Icon name='calendar outline' /><span className="title-data">Fecha de nacimiento:</span></label>
                  <Input> {new Date(egresade.birthDate).toLocaleDateString('es')} </Input>
                </Form.Field>

                <Form.Field inline>
                  <label><Icon name='level up alternate' /><span className="title-data">Nivel de ingles:</span></label>
                  <Input> {egresade.englishLevel} </Input>
                </Form.Field>

                <Form.Field inline>
                  <label><Icon name='map outline' /><span className="title-data"> Nodo:</span></label>
                  <Input> {egresade.nodeName} </Input>
                </Form.Field>

            </Form>
          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default InformacionDelEgresade;