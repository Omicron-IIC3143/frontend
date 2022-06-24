import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export function ButtonUpdatingProject({ id }) {
  const navigate = useNavigate();

  return (
    <Button variant="primary" onClick={() => navigate(`/projects/${id}/update`)} className="update-button">
      Modificar proyecto
    </Button>
  );
}

export default ButtonUpdatingProject;
