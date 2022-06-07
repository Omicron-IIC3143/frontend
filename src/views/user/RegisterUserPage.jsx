import React from 'react';
import UserForm from '../../components/userForm/UserForm';
import './RegisterUserPage.css';
import Navbar from '../../components/navbar/Navbar';

function RegisterUserPage() {
  return (
    <div>
      <div className="grid-container-register-user">
        <div>
          <Navbar />
        </div>
        <div className="flex-register-user">
          <h2 className="title-register-new-user">Formulario de registro de nuevo usuario</h2>
          <UserForm />
        </div>
      </div>
    </div>

  );
}

export default RegisterUserPage;
