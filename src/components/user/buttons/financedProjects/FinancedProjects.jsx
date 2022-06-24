import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function ButtonFinancedProjectsUser({ id }) {
  const navigate = useNavigate();

  return (
    <Button variant="primary" onClick={() => navigate(`/users/${id}/funded`, { state: { id } })}>
      Financiamientos
    </Button>
  );
}

export default ButtonFinancedProjectsUser;
