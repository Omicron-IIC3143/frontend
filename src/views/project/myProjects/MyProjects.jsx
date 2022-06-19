import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Navbar from '../../../components/navbar/Navbar';
import ButtonPostulate from '../../../components/project/projectList/buttonPostulateProject/ButtonPostulateProject';
import ProjectList from '../../../components/project/projectList/ProjectList';
// import Searcher from '../../../components/project/projectList/searcher/Searcher';
import '../../landingPage/LandingPage.css';
import Loading from '../../../components/loading/Loading';
import ButtonBack from '../../../components/buttons/buttonBack/ButtonBack';
import './MyProjects.css';

function MyProjects() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser?.token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/users/${id}/projects`, requestOptions)
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

  if (currentUser?.isAdmin == true) {
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
          {/* <div className="flex-inside-searcher">
            <Searcher />
          </div> */}
          {currentUser?.id == id ? (
            <div>
              <h1 className="titleMyProjects">
                Mis proyectos postualados
              </h1>
            </div>
          ) : (
            <div>
              <h1 className="titleMyProjects">
                Proyectos postulados por el usuario de id
                {` ${id}`}
              </h1>
            </div>
          )}
          ;
          {error ? (
            <div className="flex-inside">
              {currentUser?.id == id ? (
                <h4>
                  No has postulado proyectos aún.
                  {error.errors}
                </h4>
              ) : (
                <h4>
                  El usuario no ha postulado proyectos aún.
                  {error.errors}
                </h4>
              )}
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
          {currentUser ? (
            <div className="flex-inside-button-postulate">
              <ButtonPostulate />
            </div>
          ) : (
            <>
            </>
          ) }
          <div>
            <ButtonBack />
          </div>
        </div>
      </div>
    );
  } if (currentUser?.id == id) {
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
          {/* <div className="flex-inside-searcher">
            <Searcher />
          </div> */}
          <div>
            <h1 className="titleMyProjects">
              Mis proyectos postulados
            </h1>
          </div>
          {error ? (
            <div className="flex-inside">
              <h4>
                No has postulado proyectos aún.
                {error.errors}
              </h4>
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
          {currentUser ? (
            <div className="flex-inside-button-postulate">
              <ButtonPostulate />
            </div>
          ) : (
            <>
            </>
          ) }
          <div>
            <ButtonBack />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="grid-container">
      <div>
        <Navbar />
      </div>
      <h1 className="unauthorizedMessageMyProjects">No estás autorizado para ver los proyectos de otro usuario. </h1>
    </div>
  );
}

export default MyProjects;
