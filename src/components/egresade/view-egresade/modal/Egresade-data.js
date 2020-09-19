import React from "react";
import { Form, Input, Icon, Item } from "semantic-ui-react";
import './Modal.css';

function EgresadeData({ graduate }) {
  return (
    <Item.Group>
      <Item>
        <Item.Content verticalAlign='middle'>

          <Item.Description>
            <Form>
              
                <Form.Field inline>
                  <label><Icon name='mail outline' /> Correo:</label>
                  <Input> {graduate.graduate.mail} </Input>
                </Form.Field>

                <Form.Field inline>
                  <label><Icon name='call' /> telelfono:</label>
                  <Input > {graduate.graduate.cellphone} </Input>
                </Form.Field>

                <Form.Field inline>
                  <label><Icon name='calendar outline' /> fecha de nacimiento:</label>
                  <Input> {graduate.graduate.birthDate} </Input>
                </Form.Field>

                <Form.Field inline>
                  <label><Icon name='level up alternate' /> Nivel de ingles:</label>
                  <Input> {graduate.graduate.englishLevel} </Input>
                </Form.Field>

                <Form.Field inline>
                  <label><Icon name='home' /> Sede:</label>
                  <Input > {graduate.graduate.campus} </Input>
                </Form.Field>

                <Form.Field inline>
                  <label><Icon name='map outline' /> Nodo:</label>
                  <Input className="ui-input"> {graduate.graduate.nodeName} </Input>
                </Form.Field>

            </Form>
            <br />
            {/* <p> <Icon name='mail outline' /> <b>Correo: </b>{graduate.graduate.mail}</p>
            <p> <Icon name='call' /> <b>Teléfono: </b>{graduate.graduate.cellphone}</p>
            <p> <Icon name='calendar outline' /><b>Fecha de nacimiento: </b>{graduate.graduate.birthDate}</p>
            <p> <Icon name='level up alternate' /><b>Nivel de inglés: </b>{graduate.graduate.englishLevel}</p>
            <p> <Icon name='home' /><b>Sede: </b>{graduate.graduate.campus}</p>
            <p> <Icon name='map outline' /><b>Nodo: </b>{graduate.graduate.nodeName}</p> */}

          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default EgresadeData;
