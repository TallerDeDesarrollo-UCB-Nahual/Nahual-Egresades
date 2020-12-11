import React, { useEffect, useState } from "react";

export default function listarNodos(){
    const [nodos, setNodos] = useState([]);

    function obtenerNodos() {
      return fetch(`http://localhost:8000/api/nodos/nombreNodos/`);
    }

    const obtener = () => {
        obtenerNodos().then(sedeNodo => {
            return sedeNodo.json();
        }).then(sedeNodo => {
            setNodos(sedeNodo.response);
        })
    }

    useEffect(() => {
        obtener();
    }, []);

}
