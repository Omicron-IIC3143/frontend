import React from 'react';
import Button from 'react-bootstrap/Button';
import '../../userShow/UserShow.css';

export function ButtonUpdatingUser() {
  const printHelloWorld = () => {
    // setData("Data is set");
    // console.log('HOLA MUNDO');
  };
  return (
    <Button variant="primary" onClick={printHelloWorld} className="update-button">
      {/* startIcon={<DeleteIcon />} */}
      Actualizar información
    </Button>
  );
}

export default ButtonUpdatingUser;
