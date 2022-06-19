import React from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonFinancing.css';

function ButtonFinancing() {
  return (
    <Button variant="primary" className="financingButton">
      {/* startIcon={<DeleteIcon />} */}
      Financiar Proyecto
    </Button>
  );
}

export default ButtonFinancing;
