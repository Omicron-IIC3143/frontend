import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Navbar from '../../../components/navbar/Navbar';
import ButtonPostulate from '../../../components/project/projectList/buttonPostulateProject/ButtonPostulateProject';
import ProjectList from '../../../components/project/projectList/ProjectList';
import '../../landingPage/LandingPage.css';
import ButtonBack from '../../../components/buttons/buttonBack/ButtonBack';
import extractFundedProjects from '../../../hooks/finances';
import Loading from '../../../components/loading/Loading';

function MyProjects() {
  const { currentUser } = useAuth();
  // const [projects, setProjects] = useState([]);
  const [finances, setFinances] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);

  const getData = async () => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser?.token}`,
      },
    };
    let filter = [];
    try {
      const fetchData = (url) => fetch(url, requestOptions).then((r) => r.json());
      // acá se queda cuando el usuario aún no ha financiado proyectos
      console.log('antes');
      const [projectsData, financesData] = await Promise.all([
        fetchData(`${process.env.REACT_APP_API_URL}/projects`),
        fetchData(`${process.env.REACT_APP_API_URL}/finance/transactions/${id}`),
      ]);
      console.log('después');
      filter = extractFundedProjects(projectsData, financesData);
    } catch (errorCatch) {
      setError(errorCatch);
    } finally {
      setLoading(false);
      setFinances(filter);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (currentUser?.isAdmin || currentUser?.id == id) {
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

          {currentUser?.id != id ? (
            <h1>Proyectos financiados por otro usuario</h1>
          ) : (
            <>
              <h1>Proyectos financiados por mí</h1>
              <div className="flex-inside-button-postulate">
                <ButtonPostulate />
              </div>
            </>
          )}
          {error ? (
            <div className="flex-inside">
              <h2>
                {error.errors}
              </h2>
            </div>
          ) : (
            <> </>
          )}

          {finances.length === 0 ? (
            <h4>
              No hay proyectos financiados.
            </h4>

          ) : (
            finances.map((project) => (
              // acá hay que poner (project?.currentState == 'approved') ? (
              (project?.currentState == 'accepted') ? (
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
  return (
    <div className="grid-container">
      <div>
        <Navbar />
      </div>
      <h1 className="unauthorizedMessageMyProjects">No estás autorizado para ver los proyectos financiados por otro usuario. </h1>
    </div>
  );
}

export default MyProjects;
