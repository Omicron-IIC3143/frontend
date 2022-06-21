import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../../userShow/UserShow.css';

function NavigationToUserShow() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Button variant="primary" className="navigation-to-user-show" onClick={() => navigate(`/users/${id}`)}>
      {/* startIcon={<DeleteIcon />} */}
      Perfil del usuario
    </Button>
  );
}

export default NavigationToUserShow;
