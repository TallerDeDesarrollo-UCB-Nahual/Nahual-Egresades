import React from "react";
import {
  Header,
  Button,
  Image,
  Segment,
  Grid,
  Divider,
  Icon,
  Reveal,
  Popup
} from "semantic-ui-react";
import imagenSinAcceso from "../../assets/NoAcceso.png";
import { useAuth0 } from "@auth0/auth0-react";

const NoAutorizado = () => {
  const { user: usuario, logout: cerrarSesion } = useAuth0();

  const SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL =
    process.env.REACT_APP_SOLICITAR_ACCESO_URL;

  const DOMINIO = process.env.REACT_APP_DOMINIO;

  const CLAVE = process.env.REACT_APP_CODIGO_DE_ENCRIPTACION;

  const generarLink = () => {
    const datos = {
      nombre: usuario.name,
      correo: usuario.email,
      origen: "nahual-empresas",
      redirigir: DOMINIO
    };
    var AES = require("crypto-js/aes");
    var encriptado = AES.encrypt(JSON.stringify(datos), CLAVE);
    var url = new URL(SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL);
    var parametros = url.searchParams;
    parametros.set("datos", encriptado.toString());
    url.search = parametros.toString();
    return url.toString();
  };

  const redireccionarSolicitarAcceso = () => {
    window.location.assign(generarLink());
  };

  return (
    <>
      <Grid centered>
        <Reveal animated="small fade" instant>
          <Reveal.Content visible>
            <Image circular size="small" src={usuario.picture} />
          </Reveal.Content>
          <Reveal.Content hidden>
            <Image size="tiny" src={imagenSinAcceso} />
          </Reveal.Content>
        </Reveal>
      </Grid>
      <Header
        style={{ marginTop: "45px" }}
        textAlign="center"
        as="h2"
        content={usuario.name}
        subheader="No tienes acceso para ingresar a esta página, tienes las siguientes opciones:"
      />
      <Segment placeholder>
        <Grid columns={2} stackable textAlign="center">
          <Divider vertical>Ó</Divider>
          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              <Header icon>
                <Icon name="sign out" />
                Cambiar a una cuenta con acceso
              </Header>
              <Button onClick={() => cerrarSesion()} color="grey">
                Cerrar Sesión
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Header icon>
                <Icon name="unlock" />
                Solicitar acceso
              </Header>

              <Popup
                content="Si ya solicitaste acceso, no vuelvas a hacerlo, su solicitud esta siendo procesada."
                trigger={
                  <Button
                    onClick={() => redireccionarSolicitarAcceso()}
                    content="Solicitar"
                  />
                }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
};

export default NoAutorizado;
