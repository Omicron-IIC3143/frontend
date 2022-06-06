import React from 'react';
import RegisterProjectForm from '../../../components/project/registerProject/RegisterProjectForm';
import Navbar from '../../../components/navbar/Navbar';
import './RegisterProject.css'

function RegisterProject() {
    return (
        <div>
            <div className='grid-container'> 
                <div>
                    <Navbar />
                </div>
                <div className='flex-register-project'>
                    <h2 className="title-register-new-project">Formulario de postulación de nuevo proyecto</h2>
                    <RegisterProjectForm />
                </div>
            </div>
        </div>
    );
};

export default RegisterProject;
