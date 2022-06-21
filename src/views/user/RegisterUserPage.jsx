import React from 'react';
import UserForm from '../../components/userForm/UserForm';
import './RegisterUserPage.css';
import Navbar from '../../components/navbar/Navbar';
import useAuth from '../../hooks/useAuth';
import ButtonBack from '../../components/buttons/buttonBack/ButtonBack';

function RegisterUserPage() {
  const { currentUser } = useAuth();

  return (
    <div>
      <div className="grid-container bg-app-color">
        <div>
          <Navbar />
        </div>
        <div className="flex-register-user">
          <h2 className="title-register-new-user">Formulario de registro de nuevo usuario</h2>
          { currentUser ? (
            <>
              <p className="final-message-form-user text-register-new-user">Debes cerrar sesión para poder crear una cuenta.</p>
              <ButtonBack />
            </>
          ) : (
            <UserForm />
          )}
        </div>
      </div>
    </div>

  );
}

export default RegisterUserPage;
