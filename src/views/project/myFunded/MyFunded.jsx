import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Navbar from '../../../components/navbar/Navbar';
import TableFinancings from '../../../components/financings/TableFinancings';
import '../../landingPage/LandingPage.css';
import ButtonBack from '../../../components/buttons/buttonBack/ButtonBack';
import extractInfoFinancing from '../../../hooks/finances';
import Loading from '../../../components/loading/Loading';
import './MyFunded.css';

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
      const [projectsData, financesData] = await Promise.all([
        fetchData(`${process.env.REACT_APP_API_URL}/projects`),
        fetchData(`${process.env.REACT_APP_API_URL}/finance/transactions/${id}`),
      ]);

      filter = extractInfoFinancing(projectsData, financesData);

      // necesito nombre del proyecto (link al show)
      // monto de la transacción
      // necesito fecha de la transacción
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
            <h1 className="title-center-financings">
              Financiamientos del
              {' '}
              {' '}
              <NavLink exact to={`/users/${id}`} activeClassName="activeClicked" className="color-link">
                usuario
              </NavLink>
            </h1>
          ) : (
            <h1 className="title-center-financings">Mis financiamientos</h1>
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
            <h4 className="not-finanings-message">
              No hay financiamientos de proyectos aún.
            </h4>

          ) : (
            <div className="flex-inside">
              <TableFinancings financings={finances} />
            </div>
          )}
          <div className="button-back-financings">
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
