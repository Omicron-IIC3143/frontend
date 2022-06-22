import React from 'react';
import './RegisterUserPage.css';
import Navbar from '../../components/navbar/Navbar';
import useAuth from '../../hooks/useAuth';
import ButtonBack from '../../components/buttons/buttonBack/ButtonBack';
import UserForm from '../../components/user/userForm/UserForm';

function RegisterUserPage() {
  const { currentUser } = useAuth();

  return (
    <div>
      <div className="grid-container  ">
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
