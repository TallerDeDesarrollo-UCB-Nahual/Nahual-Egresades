import React from "react";

import BotonLogin from "./BotonLogin";
import BotonLogout from "./BotonLogout";

import { useAuth0 } from "@auth0/auth0-react";

const BotonAutenticacion = () => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? <BotonLogout /> : <BotonLogin />;
};
export default BotonAutenticacion;