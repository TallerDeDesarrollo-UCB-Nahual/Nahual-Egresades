
import React, { Component, } from 'react';
import Pdf from "react-to-pdf";
import { Button } from 'semantic-ui-react'
import diploma from "../../public/imagenes/diploma.jpg"
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import './CertificadoEstilos.css';

const ref = React.createRef();
const options = {
  orientation: 'landscape',
}

class GenerarCertificado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      apellido: '',
      nodo: ''
    };
  }

  obtenerEgresade = async () => {
    const API_URL = `${process.env.REACT_APP_EGRESADES_NAHUAL_API}/egresades/`;
    let egresadeDato;
    try {
      egresadeDato = await axios.get(`${API_URL}${this.props.match.params.id}${"/DTO"}`);
      this.setState({ nombre: egresadeDato.data.response.nombre });
      this.setState({ apellido: egresadeDato.data.response.apellido });
      this.setState({ nodo: egresadeDato.data.response.nodo });
    } catch (error) { }
  }
  componentDidMount() {
    this.obtenerEgresade();
  }
  retornar(){
    this.props.history.push("/listaEgresades");
  }
  render() {
    const { nombre, apellido, nodo } = this.state;
    return (
      <>
        {/* <div className="certificado" ref={ref}>
          <div className="datos">
            <h2 className="nodoEgresade">{nodo}</h2>
            <h1 className="nombreEgresade">{nombre} {apellido}</h1>
          </div>
        </div> */}
        <page className="certificado" ref={ref} size="A4" layout="landscape">
        <div className="datos">
            <h2 className="nodoEgresade">{nodo}</h2>
            <h1 className="nombreEgresade">{nombre} {apellido}</h1>
          </div>
        </page>
        <div className="pdfBotones">
          <Button color='red' onClick={()=>{this.retornar()}} >
            <i className="cancel icon"></i>
            <label className="icon-text">Cancelar</label>
          </Button>
          <Pdf options={options} targetRef={ref} filename={this.state.nombre + this.state.apellido + '.pdf'}>
            {({ toPdf }) => <Button onClick={toPdf} color='green'>Descargar PDF</Button>}
          </Pdf>

        </div>

      </>
    );
  }
}

export default GenerarCertificado;