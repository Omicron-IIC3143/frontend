/* eslint-disable max-len */
import React from 'react';
import UserForm from '../../components/userForm/UserForm';
import './RegisterUserPage.css';
import Navbar from '../../components/navbar/Navbar';
import useAuth from '../../hooks/useAuth';
import ButtonBack from '../../components/buttons/buttonBack/ButtonBack';

function UpdaterUserPage() {
  const { currentUser } = useAuth();

  return (
    <div>
      <div className="grid-container-register-user">
        <div>
          <Navbar />
        </div>
        <div className="flex-register-user">
          <h2 className="title-register-new-user">Ver y editar información de usuario</h2>
          { currentUser ? (
            <>
              <p className="final-message-form-user text-register-new-user">Aquí puedes ver y modificar toda tu información, incluyendo tus contraseñas, por lo que sé responsable y modifica a conciencia lo que quieras actualizar y deja en blanco aquello que quieras mantener.</p>
              <UserForm />
            </>
          ) : (
            <>
              <p className="final-message-form-user text-register-new-user">Debes iniciar sesión en una cuenta para poder actualizarla.</p>
              <ButtonBack />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdaterUserPage;
