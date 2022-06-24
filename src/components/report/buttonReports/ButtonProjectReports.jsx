import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function ButtonReports({ id, projectName, userId }) {
  const navigate = useNavigate();

  return (
    <Button variant="primary" onClick={() => navigate(`/projects/${id}/reports`, { state: { id, projectName, userId } })} className="finance-button">
      Ver reportes
    </Button>
  );
}

export default ButtonReports;
