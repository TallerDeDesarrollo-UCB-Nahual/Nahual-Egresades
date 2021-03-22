
import React from 'react';
import Pdf from "react-to-pdf";
import diploma from "../../public/imagenes/diploma.jpg"

const ref = React.createRef();
const options={
  orientation:'landscape',
}

const GenerarCertificado = (props) => {
  return (
    <>
      <div className="Post" ref={ref}>
        <h1 className="titulo">luchocomepinga</h1>
        {/* <img className="img" src={diploma}/> */}
      </div>
      <Pdf options={options} targetRef={ref} filename="post.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
      </Pdf>
    </>
  );
}

export default GenerarCertificado;