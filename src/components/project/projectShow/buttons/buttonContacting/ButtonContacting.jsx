import React from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonContacting.css';

function ButtonContacting() {
  return (
    <Button variant="primary" className="contactingButton">
      {/* startIcon={<DeleteIcon />} */}
      Contactar Proyecto
    </Button>
  );
}

export default ButtonContacting;
