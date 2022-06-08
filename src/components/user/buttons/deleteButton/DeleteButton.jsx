import React from 'react';
import Button from 'react-bootstrap/Button';
import '../../UserShow.css';

export function DeleteButton() {
  const printHelloWorld = () => {
    // setData("Data is set");
    // console.log('HOLA MUNDO');
  };
  return (
    <Button variant="primary" onClick={printHelloWorld} className="update-button">
      {/* startIcon={<DeleteIcon />} */}
      Eliminar perfil
    </Button>
  );
}

export default DeleteButton;
