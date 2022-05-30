import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Navbar from '../../components/navbar/Navbar';
import { ProjectList } from '../../components/project/projectList/ProjectList';
import { Searcher } from '../../components/searcher/Searcher';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
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
    fetch(`${process.env.REACT_APP_API_URL}/projects/`, requestOptions)
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
      <section className="container">
        <h2>Loading...</h2>
      </section>
    );
  }

  return (
    <div className="grid-container">
      <div>
        <Navbar />
      </div>
      <div className="flex">
        <div className="flex-inside-searcher">
          <Searcher />
        </div>
        {error ? (
          <div className="flex-inside">
            <h2>
              Error
              {error}
            </h2>
          </div>
        ) : (
          <>
            {projects.map((project) => (
              <div className="flex-inside">
                <ProjectList
                  id={project.id}
                  type={project.topic}
                  title={project.name}
                  description={project.description}
                />
              </div>
            ))}
          </>
        )}
        <div className="flex-inside">
          <ProjectList id="1" type="Educación" title="Ingeniería Sin Fronteras" description="Ingeniería Sin Fronteras Chile es una fundación sin fines de lucro, que busca co-crear soluciones sostenibles desde la Ingeniería Humanitaria." daysAgo="5" />
        </div>
        <div className="flex-inside">
          <ProjectList id="2" type="Medioambiente" title="Fundación Reciclaje Inclusivo" description="Fundación Reciclaje Inclusivo es un colectivo de profesionales con amplia trayectoria en el ámbito de la gestión integral de residuos y el reciclaje inclusivo en Chile y Latinoamérica." daysAgo="12" />
        </div>
        <div>
          <button onClick={() => navigate(-1)} type="button" className="button" id="backButton">Atrás</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
