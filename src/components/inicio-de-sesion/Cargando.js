import React from "react";
const imagenDeCarga =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const Cargando = () => (
  <div className="spinner">
    <img src={imagenDeCarga} alt="Cargando..." />
  </div>
);

export default Cargando;