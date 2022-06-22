import React from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonSharing.css';

function ButtonSharing() {
  return (
    <Button variant="primary" className="sharingButton">
      {/* startIcon={<DeleteIcon />} */}
      Compartir Proyecto
    </Button>
  );
}

export default ButtonSharing;
