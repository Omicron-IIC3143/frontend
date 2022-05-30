import React from 'react';
import UserForm from '../../components/userForm/UserForm';
import './RegisterUserPage.css'

function RegisterUserPage() {
  return (
    <div>
      <h2>Registrar Nuevo Usuario</h2>
      <UserForm />
      <p>Una vez registrado satisfactoriamente, cierra esta pestaña</p>
    </div>
  );
}

export default RegisterUserPage;