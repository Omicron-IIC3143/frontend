import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './ButtonBack.css';

function ButtonBack() {
  const navigate = useNavigate();

  return (
    <Button variant="secondary" className="back-button" onClick={() => navigate(-1)}>
      {/* startIcon={<DeleteIcon />} */}
      Volver atrás
    </Button>
  );
}

export default ButtonBack;
