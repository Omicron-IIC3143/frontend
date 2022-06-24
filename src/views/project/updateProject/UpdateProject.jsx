import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../components/navbar/Navbar';
import './UpdateProject.css';
import UpdateProjectForm from '../../../components/project/updateProjectForm/UpdateProjectForm';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../components/loading/Loading';

function UpdateProject() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState({});
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser?.token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, requestOptions)
      .then(async (response) => {
        if (!response.ok) {
          setError(true);
          return null;
        }
        const respuesta = await response.json();
        if (currentUser?.id != respuesta?.userId && !currentUser?.isAdmin) { navigate(-1); }
        setProject(respuesta);
        setLoading(false);
        return respuesta;
      })
      .catch(() => { setError(true); })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (!id || !currentUser) { navigate(-1); }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : <> </>}
      <div className="grid-container  ">
        {!loading ? (
          <>
            <div>
              <Navbar />
            </div>
            <div className="page-wrapper">
              <h2 className="title-register-new-project">Actualización de proyecto</h2>
              <UpdateProjectForm project={project} />
            </div>
          </>
        ) : <> </>}

        { error ? (
          <>
            <div>
              <Navbar />
            </div>
            <div className="page-wrapper">
              <h2 className="title-register-new-project">Actualización de proyecto</h2>
              <p className="final-message-form-user">No se pudo efectuar la operación</p>
            </div>
          </>
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
}

export default UpdateProject;
