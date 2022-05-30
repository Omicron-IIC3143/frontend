import React from 'react';
import Button from 'react-bootstrap/Button';

export function ButtonUpdatingUser() {
  const printHelloWorld = () => {
    // setData("Data is set");
    console.log('HOLA MUNDO');
  };
  return (
    <Button variant="primary" onClick={printHelloWorld}>
      {/* startIcon={<DeleteIcon />} */}
      Actualizar información
    </Button>
  );
}

export default ButtonUpdatingUser;
