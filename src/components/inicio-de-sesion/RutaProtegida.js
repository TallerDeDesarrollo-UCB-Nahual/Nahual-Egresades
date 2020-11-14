import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import VistaNoAutorizado from "./VistaNoAutorizado";

const RutaProtegida = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <VistaNoAutorizado />,
    })}
    {...args}
  />
);

export default RutaProtegida;