import React from 'react';
import Button from 'react-bootstrap/Button';

export function DeleteProjectButton() {
  const printHelloWorld = () => {
    // setData("Data is set");
    // console.log('HOLA MUNDO');
  };
  return (
    <Button variant="danger" onClick={printHelloWorld} className="delete-button" color="danger">
      {/* startIcon={<DeleteIcon />} */}
      Eliminar proyecto
    </Button>
  );
}

export default DeleteProjectButton;
