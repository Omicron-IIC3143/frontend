import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import '../../userShow/UserShow.css';

export function ButtonUpdatingUserShowUser({ id }) {
  const navigate = useNavigate();

  return (
    <Button variant="primary" onClick={() => navigate('/user/update', { state: { id } })} className="update-button-show-user">
      Modificar/Eliminar cuenta
    </Button>
  );
}

export default ButtonUpdatingUserShowUser;
