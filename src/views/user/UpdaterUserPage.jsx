import React from 'react';
import UserForm from '../../components/userForm/UserForm';
import DeleteUser from '../../components/deleteUser/DeleteUser'
import './RegisterUserPage.css'

function UpdaterUserPage() {
  return (
    <div>
      <h2>Editar Información de Usuario</h2>
      <p>Aquí puedes modificar toda tu información, incluyendo tus contraseñas, por lo que se responsable y modifica a conciencia lo que quieras modificar y deja en blanco aquello que quieras mantener.</p>
      <UserForm />
      <DeleteUser />
      <p>Para seguir en Social Starter, puedes cerrar esta pestaña o seguir modificando</p>
    </div>
  );
}

export default UpdaterUserPage;