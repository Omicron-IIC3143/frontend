import React from 'react';
import Button from 'react-bootstrap/Button';
import '../../userShow/UserShow.css';

function DepositButton() {
  return (
    <Button variant="primary" type="submit" className="deposit-button">
      {/* startIcon={<DeleteIcon />} */}
      Depositar
    </Button>
  );
}

export default DepositButton;
