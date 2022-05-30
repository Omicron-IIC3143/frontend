import React from 'react';
import RegisterForm from '../../../components/project/RegisterForm';
import Navbar from '../../../components/navbar/Navbar';
import './RegisterProject.css'

function RegisterProject() {
    return (
        <div>
            <div className='grid-container'> 
                <div>
                    <Navbar />
                </div>
                <div className='flex'>
                    <h2>Postulación de proyecto</h2>
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

export default RegisterProject;
