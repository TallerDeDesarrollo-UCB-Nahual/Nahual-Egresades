import React from "react";
import { Button} from 'semantic-ui-react'

const BotonSolicitarAcceso = () => <Button  onClick={() => window.location = "http://localhost:3001/"}> Solicitar Acceso </Button>

export default BotonSolicitarAcceso;