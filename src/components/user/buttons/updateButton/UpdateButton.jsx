import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function ButtonUpdatingUser({ id }) {
  const navigate = useNavigate();

  return (
    <Button variant="primary" onClick={() => navigate('/user/update', { state: { id } })} className="update-button">
      Modificar/Eliminar cuenta
    </Button>
  );
}

export default ButtonUpdatingUser;
