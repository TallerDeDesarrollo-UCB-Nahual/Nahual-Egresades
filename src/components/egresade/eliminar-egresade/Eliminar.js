import React from "react";
import { Button, Confirm } from "semantic-ui-react";
import axios from "axios";

function Eliminar({ egresadeId, eliminarVista }) {
    const [abierto, setAbierto] = React.useState(false);

    const onOpen = () => setAbierto(true);
    const onClose = () => setAbierto(false);

    const eliminarEgresadeDeAPI = (egresadeId) => {
        const API_URL = `http://fathomless-falls-62194.herokuapp.com/api/estudiantes/`;
        axios
            .delete(`${API_URL}${egresadeId}`)
            .then(response => {
                eliminarVista();
            })
            .catch(function (error) {
                console.log(error);
            });
        onClose();
    }

    return (
        <>
            <Button onClick={onOpen}>
                <i className="user delete icon"></i>
                <label className="icon-delete">Eliminar</label>
            </Button>
            <Confirm
                open={abierto}
                content='Se eliminará permanentemente'
                cancelButton='Cancelar'
                confirmButton="Confirmar" 
                onCancel={onClose}
                onConfirm={() => eliminarEgresadeDeAPI(egresadeId)}
            />
        </>
    );
}

export default Eliminar;