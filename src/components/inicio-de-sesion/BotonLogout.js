import React, { Component } from "react";
import { withAuth0 } from '@auth0/auth0-react';
import { Icon, Button } from 'semantic-ui-react';

class BotonLogout extends Component {

  render() {
    const { logout } = this.props.auth0;
    return (
      <Button color='red' onClick={() => logout({ returnTo: window.location.origin })}>Cerrar Sesión</Button>
    );
  };
}
export default withAuth0(BotonLogout);