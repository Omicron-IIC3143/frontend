import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export function ButtonFinancedProjectsUser({ id }) {
  const navigate = useNavigate();

  return (
    <Button variant="primary" onClick={() => navigate(`/users/${id}/funded`, { state: { id } })}>
      Proyectos financiados
    </Button>
  );
}

export default ButtonFinancedProjectsUser;
