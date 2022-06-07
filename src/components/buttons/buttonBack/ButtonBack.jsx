import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export function ButtonBack() {
  const navigate = useNavigate();

  return (
    <Button variant="primary" onClick={() => navigate(-1)}>
      {/* startIcon={<DeleteIcon />} */}
      Volver atrás
    </Button>
  );
}
