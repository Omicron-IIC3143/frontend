/* eslint-disable no-alert */
import React from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonSharing.css';

function copyUrlToClipboard() {
  try {
    const shareMessage = `Buenas, quería que conocieras este proyecto muy interesante.\nPuedes verlo en ${window.location.href}`;
    navigator.clipboard?.writeText(shareMessage);
    alert('link del proyecto copiado!');
  } catch (error) {
    console.log(error);
  }
}

function ButtonSharing() {
  return (
    <Button variant="primary" className="sharingButton" onClick={copyUrlToClipboard}>
      {/* startIcon={<DeleteIcon />} */}
      Compartir Proyecto
    </Button>
  );
}

export default ButtonSharing;
