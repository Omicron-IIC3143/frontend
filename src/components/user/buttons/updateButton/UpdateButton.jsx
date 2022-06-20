import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import '../../userShow/UserShow.css';

export function ButtonUpdatingUser() {
  const navigate = useNavigate();

  return (
    <Button variant="primary" onClick={() => navigate('/user/update')} className="update-button">
      Modificar/Eliminar cuenta
    </Button>
  );
}

export default ButtonUpdatingUser;
