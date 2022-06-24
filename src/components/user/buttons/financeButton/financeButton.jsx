import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export function ButtonLookFinancesUser({ id }) {
  const navigate = useNavigate();

  return (
    <Button variant="primary" onClick={() => navigate(`/users/${id}/financialinfo`, { state: { id } })} className="finance-button">
      Información financiera
    </Button>
  );
}

export default ButtonLookFinancesUser;
