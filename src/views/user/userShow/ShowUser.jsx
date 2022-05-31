import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Navbar from '../../../components/navbar/Navbar';
import './ShowUser.css';
import { UserShow } from '../../../components/user/userShow';
import { ButtonUpdatingUser } from '../../../components/user/updateButton';

function ShowUser() {
  const { currentUser } = useAuth();
  //   const navigate = useNavigate();
  return (
    <div>
      <div className="grid-container">
        <div>
          <Navbar />
        </div>
        <div className="flex">
          <h2>Información de usuario</h2>
          <UserShow
            name="Martín Sánchez"
            description="Ingeniero UC encargado de fomentar distintas vías de financiamiento para los proyectos de vivienda de Ingeniería Sin Fronteras."
            rut={currentUser?.rut}
            money={currentUser?.money}
            email={currentUser?.email}
          />
          <ButtonUpdatingUser />
        </div>
      </div>
    </div>
  );
}

export default ShowUser;
