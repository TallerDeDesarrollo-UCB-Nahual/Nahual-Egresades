import React from "react";
import { Button, Confirm } from "semantic-ui-react";
import axios from "axios";

function DeleteEgresade({ egresadeId, eliminarVista }) {
    const [abierto, setAbierto] = React.useState(false);

    const Onopen = () => setAbierto(true);
    const Onclose = () => setAbierto(false);

    const eliminarEgresadeDeAPI = (egresadeId) => {
        const API_URL = `http://fathomless-falls-62194.herokuapp.com/api/estudiantes/`;
        axios
            .delete(`${API_URL}${egresadeId}`)
            .then(response => {
                // console.log(response);
                eliminarVista();
            })
            .catch(function (error) {
                console.log(error);
            });
        // console.log("Egresado eliminado");
        // console.log(egresadeId);
        Onclose();
    }

    return (
        <>
            <Button onClick={Onopen}>
                <i className="user delete icon"></i>
                <label className="icon-delete">Eliminar</label>
            </Button>
            <Confirm
                open={abierto}
                content='Se eliminará permanentemente'
                onCancel={Onclose}
                onConfirm={() => eliminarEgresadeDeAPI(egresadeId)}
            />
        </>
    );
}

export default DeleteEgresade;