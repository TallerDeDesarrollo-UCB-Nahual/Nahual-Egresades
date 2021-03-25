import React from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Nahual_Table from '../lista-egresades/Tabla';
import Nahual_Estadisticas from '../estadisticas/barras/Test';

const ButtonExampleConditionalsCustom = () => (
  <Button.Group>
    <Button positive> 
        {<Link to={`/listaEgresades`}>
            <p style={{  color : "White"}}>Lista</p>
        </Link>}
    </Button>
    
    <Button >
        {<Link to={`/estadisticas`}>
            <p style={{  color : "Gray"}}>Estadisticas</p>
            
        </Link>}
    </Button>
  </Button.Group>
  
)

export default ButtonExampleConditionalsCustom
