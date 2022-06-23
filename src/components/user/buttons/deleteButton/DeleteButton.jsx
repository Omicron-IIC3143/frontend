import React from 'react';
import Button from 'react-bootstrap/Button';
import '../../userShow/UserShow.css';

function DeleteButton() {
  const printHelloWorld = () => {
    // setData("Data is set");
    // console.log('HOLA MUNDO');
  };
  return (
    <Button
      variant="danger"
      onClick={printHelloWorld}
      className="delete-button"
      color="danger"
    >
      {/* startIcon={<DeleteIcon />} */}
      Eliminar usuario
    </Button>
  );
}

export default DeleteButton;
