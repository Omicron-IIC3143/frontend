import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import '../../userShow/UserShow.css';

function ButtonGoProfile({ id }) {
  const navigate = useNavigate();

  return (
    <Button variant="secondary" className="profile-button" onClick={() => navigate(`/users/${id}/`, { state: { id } })}>
      Ver perfil
    </Button>
  );
}

export default ButtonGoProfile;
