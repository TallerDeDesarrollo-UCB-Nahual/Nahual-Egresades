import React from 'react'
import '../../public/stylesheets/Register.css';
import { Segment } from 'semantic-ui-react'

export default function RegistrationHeader() {
    return (
        <Segment basic textAlign='center'>
            <h2 className="titleRegister">Registrar Egresades</h2>
            <hr  style={{
            color: '#BDBDBD',
            backgroundColor: '#BDBDBD',
            borderColor : '#BDBDBD',
            maxWidth: '1000px'
            }}/>
        </Segment>
    )
}
