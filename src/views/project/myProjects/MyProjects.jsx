import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Navbar from '../../../components/navbar/Navbar';
import ButtonPostulate from '../../../components/project/projectList/buttonPostulateProject/ButtonPostulateProject';
// import ProjectList from '../../../components/project/projectList/ProjectList';
// import Searcher from '../../../components/project/projectList/searcher/Searcher';
import Loading from '../../../components/loading/Loading';
import ButtonBack from '../../../components/buttons/buttonBack/ButtonBack';
import './MyProjects.css';
import PendingList from '../../../components/project/myProjects/PendingList';
import AcceptedList from '../../../components/project/myProjects/AcceptedProjects';
import RejectedList from '../../../components/project/myProjects/RejectedProjects';

function MyProjects() {
  const { currentUser } = useAuth();
  // const [projects, setProjects] = useState([]);
  const [pendingProjects, setPendingProjects] = useState([]);
  const [acceptedProjects, setAcceptedProjects] = useState([]);
  const [rejectedProjects, setRejectedProjects] = useState([]);
  // const [filterData, setFilterData] = useState([]);
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
        return respuesta;
      })
      .then((data) => {
        setPendingProjects(data.filter(({ currentState }) => currentState == 'pending'));
        setAcceptedProjects(data.filter(({ currentState }) => currentState == 'accepted'));
        setRejectedProjects(data.filter(({ currentState }) => currentState == 'rejected'));
      })
      .catch(() => { setError(true); })
      .finally(() => setLoading(false));
  }, []);

  if (currentUser?.isAdmin || currentUser?.id == id) {
    if (loading) { return (<Loading />); }
    return (
      <div className="grid-container  ">
        <div>
          <Navbar />
        </div>
        <div className="page-wrapper">
          {/* <div className="flex-inside-searcher-my-proj">
            <Searcher projects={projects} filterData={filterData} setFilterData={setFilterData} />
          </div> */}
          {currentUser?.id == id ? (
            <>
              <h1 className="titleMyProjects title-color">
                Mis proyectos
              </h1>
              <div className="width-80 center-content-x">
                <ButtonPostulate />
              </div>
            </>
          ) : (
            <h1 className="titleMyProjects title-color">
              Proyectos del
              {' '}
              <NavLink exact to={`/users/${id}`} activeClassName="activeClicked" className="user-link-color">
                usuario
              </NavLink>
            </h1>
          )}

          {error ? (
            <div className="width-80">
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
            <>
              <AcceptedList projects={acceptedProjects} />
              <PendingList projects={pendingProjects} />
              <RejectedList projects={rejectedProjects} />
            </>
          )}
          <div className="page-buttons width-80 margin-bottom-s">
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
