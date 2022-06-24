import React from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonContacting.css';

function ButtonContacting({ visitUser, project, projectUser }) {
  let user = visitUser;
  if (!visitUser) { user = { name: 'Usuario Visitante' }; }
  return (
    <Button variant="primary" className="contactingButton" href={`mailto:${projectUser.email}?subject=Social%20Starter%20-%20Contacto%20por%20Proyecto%20${project.name}%20-%20Usuario%20${user.name}`}>
      {/* startIcon={<DeleteIcon />} */}
      Contactar Proyecto
    </Button>
  );
}

export default ButtonContacting;
