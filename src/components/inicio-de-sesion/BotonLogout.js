import React, { Component } from "react";
import { withAuth0 } from '@auth0/auth0-react';
import { Icon, Button } from 'semantic-ui-react';

class BotonLogout extends Component {

  render() {
    const { logout } = this.props.auth0;
    return (
      <Button style={{ color: "black", border: '1px solid #6D5BD0', margin: '20px 30px 0 0' }} onClick={() => logout({ returnTo: window.location.origin })}>
        <Icon name='power off' />
        Cerrar Sesión
      </Button>
    );
  };
}
export default withAuth0(BotonLogout);