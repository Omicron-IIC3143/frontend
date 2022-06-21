import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Navbar from '../../../components/navbar/Navbar';
import './ShowUser.css';
import { UserShow } from '../../../components/user/userShow/UserShow';
import { ButtonUpdatingUser } from '../../../components/user/buttons/updateButton/UpdateButton';
import ButtonBack from '../../../components/buttons/buttonBack/ButtonBack';
import Loading from '../../../components/loading/Loading';

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
        <div className="grid-container-show-user">
          <div>
            <Navbar />
          </div>
          <div className="flex-show-user">
            {error ? (
              <h3>
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
            <br />
            <ButtonUpdatingUser id={id} />
            <ButtonBack />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="grid-container-show-user">
        <div>
          <Navbar />
        </div>
        <div>
          { currentUser ? (
            <h1 className="unauthorizedMessageFinancialInfo">No estás autorizado para ver el perfil de otro usuario. </h1>
          ) : (
            <h1 className="unauthorizedMessageFinancialInfo">Inicia sesión para ver el perfil de tu usuario. </h1>
          )}
          <ButtonBack />
        </div>
      </div>
    </div>
  );
}

export default ShowUser;
