import React from "react";
import { useHistory } from "react-router-dom";
import {Auth0Provider } from "@auth0/auth0-react";

const ProveedorAuth0ConHistoria = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const history = useHistory();
  const CALLBACK_PATH = 'http://localhost:3000/listaEgresades';
  const onRedirectCallback = (appState) => {
    history.replace(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain="dev-x08p31h3.us.auth0.com"
      clientId="gQzzs4WlsO3oap0btBQNUAdu72Qio8B3"
      redirectUri={CALLBACK_PATH}
      onRedirectCallback={onRedirectCallback}>
      {children}
      
    </Auth0Provider>
  );
};

export default ProveedorAuth0ConHistoria;