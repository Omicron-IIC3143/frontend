import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import Navbar from '../../../components/navbar/Navbar';
import ButtonPostulate from '../../../components/project/projectList/buttonPostulateProject/ButtonPostulateProject';
import ProjectList from '../../../components/project/projectList/ProjectList';
import Searcher from '../../../components/project/projectList/searcher/Searcher';
import '../../landingPage/LandingPage.css';
import ButtonBack from '../../../components/buttons/buttonBack/ButtonBack';
import Loading from '../../../components/loading/Loading';

function MyProjects() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser?.token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/users/${currentUser.id}/projects`, requestOptions)
      .then(async (response) => {
        if (!response.ok) {
          setError(true);
          return [];
        }
        const respuesta = await response.json();
        setProjects(respuesta);
        return respuesta;
      })
      .catch(() => { setError(true); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  } return (
    <div className="grid-container">
      <div>
        <Navbar />
      </div>
      <div className="flex-landing-page">
        <div className="flex-inside-searcher">
          <Searcher />
        </div>
        {currentUser ? (
          <div className="flex-inside-button-postulate">
            <ButtonPostulate />
          </div>
        ) : (
          <>
          </>
        ) }
        {error ? (
          <div className="flex-inside">
            <h2>
              No hay proyectos aún.
              {error.errors}
            </h2>
          </div>
        ) : (
          projects.map((project) => (
            // acá hay que poner (project?.currentState == 'approved') ? (
            (project?.currentState == 'pending') ? (
              <div className="flex-inside">
                <ProjectList
                  id={project?.id}
                  topic={project?.topic}
                  title={project?.name}
                  description={project?.description}
                  date={project?.createdAt}
                  company={project?.company}
                />
              </div>
            ) : (
              <>
              </>
            )
          ))
        )}
        <div>
          <ButtonBack />
        </div>
      </div>
    </div>
  );
}

export default MyProjects;
