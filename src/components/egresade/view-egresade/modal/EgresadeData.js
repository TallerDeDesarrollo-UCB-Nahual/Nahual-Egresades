import React from "react";
import { Form, Input, Icon, Item } from "semantic-ui-react";
import './Modal.css';

function EgresadeData({ graduate }) {
  return (
    <Item.Group>
      <Item>
        <Item.Content verticalAlign='middle'>

          <Item.Description>
            <Form id="form-data">
              
                <Form.Field inline>
                  <label><Icon name='mail outline' /><span className="title-data">Correo:</span></label>
                  <Input> {graduate.mail} </Input>
                </Form.Field>

                <Form.Field inline>
                <label><Icon name='call' /><span className="title-data">Telefono:</span></label>
                  <Input > {graduate.cellphone} </Input>
                </Form.Field>

                <Form.Field inline>
                  <label><Icon name='calendar outline' /><span className="title-data">Fecha de nacimiento:</span></label>
                  <Input> {new Date(graduate.birthDate).toLocaleDateString('es')} </Input>
                </Form.Field>

                <Form.Field inline>
                  <label><Icon name='level up alternate' /><span className="title-data">Nivel de ingles:</span></label>
                  <Input> {graduate.englishLevel} </Input>
                </Form.Field>

                <Form.Field inline>
                  <label><Icon name='home' /><span className="title-data"> Sede:</span></label>
                  <Input> {graduate.campus} </Input>
                </Form.Field>

                <Form.Field inline>
                  <label><Icon name='map outline' /><span className="title-data"> Nodo:</span></label>
                  <Input> {graduate.nodeName} </Input>
                </Form.Field>

            </Form>
          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default EgresadeData;
