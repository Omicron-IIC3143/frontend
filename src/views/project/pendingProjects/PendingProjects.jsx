/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import ButtonBack from '../../../components/buttons/buttonBack/ButtonBack';
import PendingProjectList from '../../../components/project/pendingProjectList/PendingProjectList';
import Navbar from '../../../components/navbar/Navbar';
import Loading from '../../../components/loading/Loading';
import useAuth from '../../../hooks/useAuth';
// import { set } from 'date-fns';

function PendingProjects() {
  const { currentUser } = useAuth();
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  const [projects, setProjects] = useState([]);
  // const [pendingProjects, setPendingProjects] = useState([]);

  //   const getData = async () => {
  //     setLoading(true);
  //     const requestOptions = {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${currentUser?.token}`,
  //       },
  //     };

  //     const fetchData = (url) => fetch(url, requestOptions).then((r) => r.json());
  //     const [projectsData] = await Promise.all([
  //       fetchData(`${process.env.REACT_APP_API_URL}/projects`),
  //     ]);
  //     const filter = projectsData.filter(({ currentState }) => currentState == 'pending');
  //     console.log(filter);
  //     setLoading(false);
  //     setProjects(filter);
  //   };

  //   useEffect(() => {
  //     getData();
  //   }, []);
  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: currentUser ? `Bearer ${currentUser.token}` : null,
      },
    };

    fetch(`${process.env.REACT_APP_API_URL}/projects`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return [];
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data.filter(({ currentState }) => currentState == 'pending'));
      })
    //   .then((data) => {
    //     const filter = data.filter(({ currentState }) => currentState == 'pending');
    //     setProjects(filter);
    //   })
      .catch(() => { setError(true); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) { return <Loading />; }

  return (
    <div className="grid-container  ">
      <Navbar />
      <div className="page-wrapper">
        <h2 className="title-color">Proyectos pendientes</h2>

        { error && currentUser?.isAdmin ? (
          <div className="width-80">
            <h3>Error</h3>
            <p>{error.errors}</p>
          </div>
        ) : null }

        { !(currentUser?.isAdmin) ? (
          <div className="width-80">
            <h3>Acceso denegado</h3>
            <p>No tiene las credenciales necesarias para poder acceder a esta página.</p>
          </div>
        ) : null }

        { !error && currentUser?.isAdmin ? (
          <PendingProjectList projects={projects} className="width-80" />
        ) : null }

        <div className="page-buttons width-80 margin-bottom-s">
          <ButtonBack />
        </div>
      </div>
    </div>
  );
}

export default PendingProjects;
