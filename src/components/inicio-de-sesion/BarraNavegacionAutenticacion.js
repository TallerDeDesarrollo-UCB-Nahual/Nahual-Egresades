import React from "react";
import BotonAutenticacion from "./BotonAutenticacion";
import BotonSolicitarAcceso from "./BotonSolicitarAcceso";

const BarraNavegacionAutenticacion = () => (
  <div className="navbar-nav ml-auto">
    <BotonSolicitarAcceso />
    <BotonAutenticacion />
  </div>
);

export default BarraNavegacionAutenticacion;