import React from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonPostulateProject.css';

function ButtonPostulate() {
  const postulateProject = () => {
    // setData("Data is set");
    // console.log('HOLA MUNDO');
  };
  return (
    <Button className="button-postulate-project" variant="primary" onClick={postulateProject} href="/projectregister">
      {/* startIcon={<DeleteIcon />} */}
      Postular Nuevo Proyecto
    </Button>
  );
}

export default ButtonPostulate;
