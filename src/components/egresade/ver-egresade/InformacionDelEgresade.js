import React from "react";
import { Form, Input, Icon, Item } from "semantic-ui-react";
import '../../../public/stylesheets/Modal.css';

function MostrarEstadoDelEgresade(estado){
  console.log("hola");
  var estadoEgresade = 'Desempleado'
  if(estado){
    estadoEgresade = 'Empleado';
  }
  return estadoEgresade;
}

function InformacionDelEgresade({ egresade }) {
  var hoy = new Date(egresade.fechaNacimiento);
  var mañana = new Date(hoy);
  mañana.setDate(hoy.getDate()+1);
  console.log(egresade.esEmpleado);
  return (
    <Item.Group>
      <Item>
        <Item.Content verticalAlign='middle'>

          <Item.Description>
            <Form id="form-data">

              <Form.Field inline>
                <label><Icon name='mail outline' /><span className="title-data">Correo:</span></label>
                <Input> {egresade.correo} </Input>
              </Form.Field>

              <Form.Field inline>
                <label><Icon name='call' /><span className="title-data">Telefono:</span></label>
                <Input > {egresade.celular} </Input>
              </Form.Field>

              <Form.Field inline>
                <label><Icon name='calendar outline' /><span className="title-data">Fecha de nacimiento:</span></label>
                <Input> {egresade.fechaNacimiento != null ? mañana.toLocaleDateString('es') : "Sin Fecha"} </Input>
              </Form.Field>

              <Form.Field inline>
                <label><Icon name='level up alternate' /><span className="title-data">Nivel de ingles:</span></label>
                <Input> {egresade.nivelIngles} </Input>
              </Form.Field>

              <Form.Field inline>
                <label><Icon name='map outline' /><span className="title-data"> Nodo:</span></label>
                <Input> {egresade.nodo} </Input>
              </Form.Field>

              <Form.Field inline>
                <label><Icon name='map outline' /><span className="title-data"> Sede:</span></label>
                <Input> {egresade.sede} </Input>
              </Form.Field>

              <Form.Field inline>
                <label><Icon name='child' /><span className="title-data"> Estado:</span></label>
                <Input> {MostrarEstadoDelEgresade(egresade.esEmpleado)} </Input>
              </Form.Field>

            {             egresade.esEmpleado===true&&
              <Form.Field inline>
                <label><Icon name='briefcase' /><span className="title-data"> Empleo Actual:</span></label>
                <Input>  {egresade.lugarActualTrabajo != "" ?egresade.lugarActualTrabajo : "No asginado"} </Input>
              </Form.Field>
            }
            {              egresade.esEmpleado===true&&
              <Form.Field inline>
                <label><Icon name='calendar outline' /><span className="title-data"> Fecha obtencion empleo actual:</span></label>
                <Input>  {egresade.fechaActualTrabajo != null ? mañana.toLocaleDateString('es') : "Sin Fecha"} </Input>
              </Form.Field>
            }
              <Form.Field inline>
                <label><Icon name='briefcase' /><span className="title-data"> Primer empleo:</span></label>
                <Input> {egresade.nombrePrimerTrabajo} </Input>
              </Form.Field>

            </Form>
          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default InformacionDelEgresade;
