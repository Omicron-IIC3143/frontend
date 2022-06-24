/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import ButtonBack from '../../components/buttons/buttonBack/ButtonBack';
import Navbar from '../../components/navbar/Navbar';
import Loading from '../../components/loading/Loading';
import useAuth from '../../hooks/useAuth';
import ReportsList from '../../components/report/reportList/ReportList';
import CreateReport from '../../components/report/CreateReport';

function ProjectReports() {
  // const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reports, setReports] = useState([]);
  const { currentUser } = useAuth();

  const location = useLocation();
  const projectName = location?.state?.projectName;
  const userId = location?.state?.userId;

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: currentUser ? `Bearer ${currentUser.token}` : null,
      },
    };

    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}/report`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return [];
        }
        return response.json();
      })
      .then((data) => {
        setReports(data);
      })
      .catch(() => { setError(true); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) { return <Loading />; }

  return (
    <div className="grid-container  ">
      <Navbar />
      <div className="page-wrapper">
        <h2 className="title-color">{`Reportes del proyecto ${projectName}`}</h2>

        { error ? (
          <div className="width-80 title-color">
            <h3>Error</h3>
            <p>{error.errors}</p>
          </div>
        ) : null }

        {/* { !(currentUser?.isAdmin) || currentUser?.id != userId ? (
          <div className="width-80 title-color">
            <h3>Acceso denegado</h3>
            <p>No tiene las credenciales necesarias para poder acceder a esta página.</p>
          </div>
        ) : null } */}

        { !error ? (
          <ReportsList reports={reports} className="width-80" auth={(currentUser?.isAdmin)} /> // AQUI DECIDIMOS QUIEN PUEDE ELIMINAR
        ) : null }

        {(currentUser?.id == userId) || (currentUser?.isAdmin) ? (
          <CreateReport id={id} userId={userId} projectName={projectName} className="width-80" />
        ) : null}

        <div className="page-buttons width-80 margin-bottom-s">
          <ButtonBack />
        </div>
      </div>
    </div>
  );
}

export default ProjectReports;
