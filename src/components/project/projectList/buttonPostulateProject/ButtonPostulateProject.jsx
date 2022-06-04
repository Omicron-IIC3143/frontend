import React from "react";
import Button from 'react-bootstrap/Button'
import { useNavigate, Link } from 'react-router-dom';

export function ButtonPostulateProject() {
    const postulateProject = () => {
        // setData("Data is set");
        console.log('HOLA MUNDO');
      }
    return (
        <Button variant="primary" onClick={postulateProject} href="/projectregister">
            {/* startIcon={<DeleteIcon />} */}
        Postular Proyecto
        </Button>
    )
}

export default ButtonPostulateProject;