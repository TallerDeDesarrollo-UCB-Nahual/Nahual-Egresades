import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const ProveedorAuth0ConHistoria = ({ children }) => {
  const domain = `${process.env.DOMAIN}/egresades/`;
  const clientId = `${process.env.CLIENT_ID}/egresades/`;


  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      useRefreshTokens={true}
      cacheLocation="localstorage">
      {children}
    </Auth0Provider>
  );
};

export default ProveedorAuth0ConHistoria;