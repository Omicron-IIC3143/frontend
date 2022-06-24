/* eslint-disable max-len */
import React from 'react';
import { useLocation } from 'react-router-dom';
import './RegisterUserPage.css';
import Navbar from '../../components/navbar/Navbar';
import useAuth from '../../hooks/useAuth';
import ButtonBack from '../../components/buttons/buttonBack/ButtonBack';
import UserForm from '../../components/user/userForm/UserForm';

function UpdaterUserPage() {
  const { currentUser } = useAuth();
  const location = useLocation();

  const id = location?.state?.id;

  return (
    <div>
      <div className="grid-container">
        <div>
          <Navbar />
        </div>
        <div className="page-wrapper">
          <h2 className="title-register-new-user width-80">Ver y editar información de usuario</h2>
          { id == currentUser?.id && currentUser ? (

            <>
              <p className="final-message-form-user text-register-new-user width-80">Aquí puedes ver y modificar toda tu información, incluyendo tus contraseñas, por lo que sé responsable y modifica a conciencia lo que quieras actualizar y deja en blanco aquello que quieras mantener.</p>
              <UserForm />
            </>
          ) : (<> </>)}

          { id != currentUser?.id && currentUser ? (
            <>
              <p className="final-message-form-user text-register-new-user width-80">Señor Admin, aquí puedes ver y modificar toda su información, incluyendo sus contraseñas, por lo que se responsable y modifica a conciencia lo que quieras modificar y deja en blanco aquello que quieras mantener.</p>
              <UserForm />
            </>
          ) : (<> </>)}

          { !currentUser ? (
            <>
              <p className="final-message-form-user text-register-new-user width-80">Debes iniciar sesión en una cuenta para poder actualizarla.</p>
              <ButtonBack />
            </>
          ) : (<> </>)}
        </div>
      </div>
    </div>
  );
}

export default UpdaterUserPage;
