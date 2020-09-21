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
                  <Input> {graduate.graduate.mail} </Input>
                </Form.Field>

                <Form.Field inline>
                <label><Icon name='call' /><span className="title-data">Telefono:</span></label>
                  <Input > {graduate.graduate.cellphone} </Input>
                </Form.Field>

                <Form.Field inline>
                  <label><Icon name='calendar outline' /><span className="title-data">Fecha de nacimiento:</span></label>
                  <Input> {graduate.graduate.birthDate} </Input>
                </Form.Field>

                <Form.Field inline>
                  <label><Icon name='level up alternate' /><span className="title-data">Nivel de ingles:</span></label>
                  <Input> {graduate.graduate.englishLevel} </Input>
                </Form.Field>

                <Form.Field inline>
                  <label><Icon name='home' /><span className="title-data"> Sede:</span></label>
                  <Input> {graduate.graduate.campus} </Input>
                </Form.Field>

                <Form.Field inline>
                  <label><Icon name='map outline' /><span className="title-data"> Nodo:</span></label>
                  <Input> {graduate.graduate.nodeName} </Input>
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
