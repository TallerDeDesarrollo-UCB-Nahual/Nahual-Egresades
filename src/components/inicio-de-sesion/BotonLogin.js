import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Icon, Button } from 'semantic-ui-react';
import '../../public/stylesheets/Navbar.css';

class BotonLogin extends Component {
  render() {
    const { isAuthenticated, loginWithRedirect } = this.props.auth0;
    return !isAuthenticated && (
      <Button style={{ color: "black", border: '1px solid #6D5BD0' }} onClick={() => loginWithRedirect()}>
        <Icon name='google plus g' color='green' />
          Iniciar Sesion
      </Button>
    );
  };
}
export default withAuth0(BotonLogin);