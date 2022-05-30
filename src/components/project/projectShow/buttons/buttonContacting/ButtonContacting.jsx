import React from "react";
import Button from 'react-bootstrap/Button'

export function ButtonContacting() {
    const printHelloWorld = () => {
        // setData("Data is set");
        console.log('HOLA MUNDO')
      }
    return (
        <Button variant="primary" onClick={printHelloWorld}>
            {/* startIcon={<DeleteIcon />} */}
        Contactar Proyecto
        </Button>
    )
}