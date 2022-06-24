import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Navbar from '../../../components/navbar/Navbar';
import './ShowUser.css';
import UserShow from '../../../components/user/userShow/UserShow';
import ButtonUpdatingUser from '../../../components/user/buttons/updateButton/UpdateButton';
import ButtonBack from '../../../components/buttons/buttonBack/ButtonBack';
import Loading from '../../../components/loading/Loading';
import ButtonLookFinancesUser from '../../../components/user/buttons/financeButton/FinanceButton';
import ButtonPostulatedProjectsUser from '../../../components/user/buttons/postulatedProjects/PostulatedProjects';
import ButtonFinancedProjectsUser from '../../../components/user/buttons/financedProjects/FinancedProjects';

function ShowUser() {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  //   const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser?.token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, requestOptions)
      .then(async (response) => {
        if (!response.ok) {
          setError(true);
          return null;
        }
        const respuesta = await response.json();
        setUser(respuesta);
        return respuesta;
      })
      .catch(() => { setError(true); })
      .finally(() => setLoading(false));
  }, []);

  if (currentUser?.id == id || currentUser?.isAdmin) {
    if (loading) { return (<Loading />); }
    return (
      <div>
        <div className="grid-container  ">
          <div>
            <Navbar />
          </div>
          <div className="page-wrapper">
            {error ? (
              <h3 className="title-color">
                ERROR:
                {' '}
                {error.errors}
              </h3>
            ) : (
              <UserShow
                name={user?.name}
                description={user?.description}
                rut={user?.rut}
                money={user?.money}
                email={user?.email}
                pictureURL={user?.pictureUrl}
                editorIsOtherUser={currentUser?.isAdmin && id != currentUser?.id}
              />
            )}
            <div className="page-buttons width-80 margin-bottom-s">
              <ButtonBack />
              <ButtonFinancedProjectsUser id={user.id} />
              <ButtonPostulatedProjectsUser id={user.id} />
              <ButtonLookFinancesUser id={user.id} />
              <ButtonUpdatingUser id={user.id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="grid-container  ">
        <div>
          <Navbar />
        </div>
        <div>
          { currentUser ? (
            <h1 className="unauthorizedMessageFinancialInfo title-color">No estás autorizado para ver el perfil de otro usuario. </h1>
          ) : (
            <h1 className="unauthorizedMessageFinancialInfo title-color">Inicia sesión para ver el perfil de tu usuario. </h1>
          )}
          <div className="page-buttons width-80 margin-bottom-s">
            <ButtonBack />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowUser;
