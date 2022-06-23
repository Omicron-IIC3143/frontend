import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export function ButtonPostulatedProjectsUser({ id }) {
  const navigate = useNavigate();

  return (
    <Button variant="primary" onClick={() => navigate(`/users/${id}/projects`, { state: { id } })}>
      Proyectos postulados
    </Button>
  );
}

export default ButtonPostulatedProjectsUser;
