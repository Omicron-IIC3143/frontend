import React from "react";
import Button from 'react-bootstrap/Button'

export function ButtonSharing() {
    const printHelloWorld = () => {
        // setData("Data is set");
        console.log('HOLA MUNDO')
      }
    return (
        <Button variant="primary" onClick={printHelloWorld}>
            {/* startIcon={<DeleteIcon />} */}
        Compartir Proyecto
        </Button>
    )
}