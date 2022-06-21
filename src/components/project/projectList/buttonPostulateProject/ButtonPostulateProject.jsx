import React from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonPostulateProject.css';

function ButtonPostulate() {
  return (
    <Button className="button-postulate-project bg-dark-color" variant="primary" href="/projectregister">
      {/* startIcon={<DeleteIcon />} */}
      Postular Nuevo Proyecto
    </Button>
  );
}

export default ButtonPostulate;
