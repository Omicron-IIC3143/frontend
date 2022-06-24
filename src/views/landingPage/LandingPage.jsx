import './LandingPage.css';
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import Navbar from '../../components/navbar/Navbar';
import ProjectList from '../../components/project/projectList/ProjectList';
import Searcher from '../../components/project/projectList/searcher/Searcher';
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

  if (loading) { return (<Loading />); }

  return (
    <div className="grid-container  ">
      <div>
        <Navbar />
      </div>
      <div className="page-wrapper ">
        <div className="width-80">
          <h1 className="title-landing-page title-color">
            Proyectos en la aplicación
          </h1>
        </div>
        <div className="width-80 center-content-x">
          <Searcher projects={projects} setFilterData={setFilterData} className="width-100" />
        </div>
        {error ? (
          <div className="width-80">
            <h2 className="title-color">
              Error:
              {error.errors}
            </h2>
          </div>
        ) : (
          filterData.map((project) => (
            // acá hay que poner (project?.currentState == 'approved') ? (
            (project?.currentState == 'accepted') ? (
              <div className="width-80">
                <ProjectList
                  id={project?.id}
                  topic={project?.topic}
                  title={project?.name}
                  description={project?.description}
                  date={project?.createdAt}
                  company={project?.company}
                />
              </div>
            ) : (<> </>)
          ))
        )}
      </div>
    </div>
  );
}

export default LandingPage;
