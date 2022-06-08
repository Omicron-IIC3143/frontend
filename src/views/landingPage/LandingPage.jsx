import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import useAuth from '../../hooks/useAuth';
import Navbar from '../../components/navbar/Navbar';
import ButtonPostulate from '../../components/project/projectList/buttonPostulateProject/ButtonPostulateProject';
import ProjectList from '../../components/project/projectList/ProjectList';
import { Searcher } from '../../components/project/projectList/searcher/Searcher';
import './LandingPage.css';
import Loading from '../../components/loading/Loading';

function LandingPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log('aqui probablemente llega');

  useEffect(() => {
    console.log('veamos si aqui llega');
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
              Error
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
          <Button className="button-back-landing" variant="primary" onClick={() => navigate(-1)} type="button" id="backButton">Atrás</Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
