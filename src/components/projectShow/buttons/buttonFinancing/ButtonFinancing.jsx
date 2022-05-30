import React from "react";
import Button from 'react-bootstrap/Button'
import './ButtonFinancing.css'

export function ButtonFinancing() {
    const printHelloWorld = () => {
        // setData("Data is set");
        console.log('HOLA MUNDO')
      }
    return (
        <Button variant="primary" onClick={printHelloWorld} className="financingButtton">
            {/* startIcon={<DeleteIcon />} */}
        Financiar Proyecto
        </Button>
    )
}

