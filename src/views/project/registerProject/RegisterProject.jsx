import React from 'react';
import RegisterProjectForm from '../../../components/project/registerProject/RegisterProjectForm';
import Navbar from '../../../components/navbar/Navbar';
import './RegisterProject.css';

function RegisterProject() {
  return (
    <div>
      <div className="grid-container  ">
        <div>
          <Navbar />
        </div>
<<<<<<< HEAD
        <div className="flex-register-project">
          <h2 className="title-register-new-project">
            Postulación de nuevo proyecto
          </h2>
=======
        <div className="page-wrapper">
          <h2 className="title-register-new-project">Postulación de nuevo proyecto</h2>
>>>>>>> dev
          <RegisterProjectForm />
        </div>
      </div>
    </div>
  );
}

export default RegisterProject;
