import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

const ProveedorAuth0ConHistoria = ({ children }) => {
  const domain = `${process.env.REACT_APP_DOMAIN}`;
  const clientId = `${process.env.REACT_APP_CLIENT_ID}`;


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