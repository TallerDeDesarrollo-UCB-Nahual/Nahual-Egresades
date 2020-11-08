import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button, Header, Image, Segment } from "semantic-ui-react";
import imagenSaludo from "../../assets/saludo.png";

const IniciarSesion = () => {
  const { loginWithRedirect: iniciarSesion } = useAuth0();
  return (
    <Segment vertical textAlign="center">
      <Image size="small" centered src={imagenSaludo} />
      <Header textAlign="center" size="huge" icon>
        ¡Bienvenido!
        <Header.Subheader>
          Es bueno tenerte aquí, para poder continuar debes:
        </Header.Subheader>
      </Header>
      <Button
        style={{ marginTop: "30px" }}
        content="Iniciar Sesión"
        icon="right chevron"
        labelPosition="right"
        size="big"
        onClick={() => iniciarSesion()}
      />
    </Segment>
  );
};

export default IniciarSesion;
