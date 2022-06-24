import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../components/navbar/Navbar';
import './UpdateProject.css';
import UpdateProjectForm from '../../../components/project/updateProjectForm/UpdateProjectForm';
import useAuth from '../../../hooks/useAuth';

function UpdateProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  if (!id || !currentUser) { navigate(-1); }

  return (
    <div>
      <div className="grid-container  ">
        <div>
          <Navbar />
        </div>
        <div className="page-wrapper">
          <h2 className="title-register-new-project">Actualización de proyecto</h2>
          <UpdateProjectForm projectId={id} />
        </div>
      </div>
    </div>
  );
}

export default UpdateProject;
