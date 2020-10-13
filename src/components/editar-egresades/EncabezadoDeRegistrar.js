import React from 'react'
import '../../public/stylesheets/Registrar.css';
import { Segment } from 'semantic-ui-react'

export default function EncabezadoDeRegistrar() {
    return (
        <Segment basic textAlign='center'>
            <h2 className="tituloRegistrar">Editar Egresade</h2>
            <hr  style={{
            color: '#BDBDBD',
            backgroundColor: '#BDBDBD',
            borderColor : '#BDBDBD',
            maxWidth: '1000px'
            }}/>
        </Segment>
    )
}
