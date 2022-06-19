import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './ButtonBackShowProject.css';

function ButtonBackShowProject() {
  const navigate = useNavigate();

  return (
    <Button variant="primary" className="backButton" onClick={() => navigate(-1)}>
      {/* startIcon={<DeleteIcon />} */}
      Volver atrás
    </Button>
  );
}

export default ButtonBackShowProject;
