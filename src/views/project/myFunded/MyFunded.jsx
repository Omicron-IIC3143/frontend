import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import Navbar from '../../../components/navbar/Navbar';
import ButtonPostulate from '../../../components/project/projectList/buttonPostulateProject/ButtonPostulateProject';
import ProjectList from '../../../components/project/projectList/ProjectList';
import Searcher from '../../../components/project/projectList/searcher/Searcher';
import '../../landingPage/LandingPage.css';
import ButtonBack from '../../../components/buttons/buttonBack/ButtonBack';
import extractFundedProjects from '../../../hooks/finances';
import Loading from '../../../components/loading/Loading';

function MyProjects() {
  const { currentUser } = useAuth();
  // const [projects, setProjects] = useState([]);
  const [finances, setFinances] = useState([]);
  const [loading, setLoading] = useState(false);
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

    const fetchData = (url) => fetch(url, requestOptions).then((r) => r.json());

    const [projectsData, financesData] = await Promise.all([
      fetchData(`${process.env.REACT_APP_API_URL}/projects`),
      fetchData(`${process.env.REACT_APP_API_URL}/finance/transactions/${currentUser.id}`),
    ]);
    const filter = extractFundedProjects(projectsData, financesData);
    setLoading(false);
    setFinances(filter);
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${currentUser?.token}`,
  //     },
  //   };
  //   fetch(`${process.env.REACT_APP_API_URL}/projects`, requestOptions)
  //     .then((response) => {
  //       if (!response.ok) {
  //         setError(true);
  //         return [];
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setProjects(data);
  //     })
  //     .catch(() => { setError(true); })
  //     .finally(() => setLoading(false));
  // }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${currentUser?.token}`,
  //     },
  //   };
  //   fetch(`${process.env.REACT_APP_API_URL}/
  // finance/transactions/${currentUser.id}`, requestOptions)
  //     .then(async (response) => {
  //       if (!response.ok) {
  //         setError(true);
  //         return [];
  //       }
  //       const respuesta = await response.json();
  //       setFinances(respuesta);
  //       console.log(finances);
  //       console.log(projects);
  //       return respuesta;
  //     })
  //     .catch(() => { setError(true); })
  //     .finally(() => setLoading(false));
  //   //  const filter = extractFundedProjects(projects, finances);
  // }, []);
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

export default MyProjects;
