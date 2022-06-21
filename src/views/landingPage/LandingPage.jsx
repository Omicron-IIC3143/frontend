import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import Navbar from '../../components/navbar/Navbar';
import ProjectList from '../../components/project/projectList/ProjectList';
import Searcher from '../../components/project/projectList/searcher/Searcher';
import './LandingPage.css';
import Loading from '../../components/loading/Loading';

function LandingPage() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [filterData, setFilterData] = useState([]);
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
    fetch(`${process.env.REACT_APP_API_URL}/projects/`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return [];
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setFilterData(data);
      })
      .catch(() => { setError(true); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  } return (
    <div className="grid-container bg-app-color">
      <div>
        <Navbar />
      </div>
      <div className="page-wrapper">
        <div className="flex-inside-searcher">
          <Searcher projects={projects} filterData={filterData} setFilterData={setFilterData} />
        </div>
        <div>
          <h1 className="titleLandingPage">
            Proyectos en la aplicación
          </h1>
        </div>
        {error ? (
          <div className="flex-inside-landing">
            <h2>
              Error
              {error.errors}
            </h2>
          </div>
        ) : (
          filterData.map((project) => (
            // acá hay que poner (project?.currentState == 'approved') ? (
            (project?.currentState == 'pending') ? (
              <div className="flex-inside-landing">
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
      </div>
    </div>
  );
}

export default LandingPage;
