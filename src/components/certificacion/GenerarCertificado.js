
import React, { Component, } from 'react';
import Pdf from "react-to-pdf";
import diploma from "../../public/imagenes/diploma.jpg"
import axios from 'axios';
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

  obtenerEgresade = async ()=>{
    const API_URL = `${process.env.REACT_APP_EGRESADES_NAHUAL_API}/egresades/`;
    let egresadeDato;
    try{
      egresadeDato=await axios.get(`${API_URL}${this.props.match.params.id}${"/DTO"}`);
      this.setState({nombre:egresadeDato.data.response.nombre});
      this.setState({apellido:egresadeDato.data.response.apellido});
      this.setState({nodo:egresadeDato.data.response.nodo});
    }catch(error)
    {}
  }
componentDidMount(){
  this.obtenerEgresade();
}
  render() {
    const {nombre,apellido,nodo}=this.state;
    return (
      <>
        <div className="Post" ref={ref}>
          <div className="Datos">
            <h2 className="nodoEgresade">{nodo}</h2>
            <h1 className="nombreEgresade">{nombre} {apellido}</h1>
          </div>
        </div>
        <Pdf options={options} targetRef={ref} filename="certificado.pdf">
          {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
        </Pdf>
      </>
    );
  }
}

export default GenerarCertificado;