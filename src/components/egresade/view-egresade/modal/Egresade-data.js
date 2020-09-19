import React from "react";
import { Icon, Item } from "semantic-ui-react";

function EgresadeData({ graduate }) {
  return (
    <Item.Group>
      <Item>
        <Item.Content verticalAlign='middle'>
            
          <Item.Description>
            <p> <Icon name='mail outline'/> <b>Correo: </b>{graduate.graduate.mail}</p>
            <p> <Icon name='call'/> <b>Teléfono: </b>{graduate.graduate.cellphone}</p>
            <p> <Icon name='calendar outline'/><b>Fecha de nacimiento: </b>{graduate.graduate.birthDate}</p>
            <p> <Icon name='level up alternate'/><b>Nivel de inglés: </b>{graduate.graduate.englishLevel}</p>
            <p> <Icon name='home'/><b>Sede: </b>{graduate.graduate.campus}</p>
            <p> <Icon name='map outline'/><b>Nodo: </b>{graduate.graduate.nodeName}</p>
            {/* <p> <Icon name='linkedin'/><b>Linkedin: </b><a href={graduate.graduate.linkedin} target="_blank">{graduate.graduate.linkedin} </a></p> */}
            
          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default EgresadeData;
