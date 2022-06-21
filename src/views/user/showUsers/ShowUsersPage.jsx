/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import ButtonBack from '../../../components/buttons/buttonBack/ButtonBack';
import UsersList from '../../../components/usersList/UsersList';
import Navbar from '../../../components/navbar/Navbar';
import Loading from '../../../components/loading/Loading';
import useAuth from '../../../hooks/useAuth';

function ShowUsersPage() {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: currentUser ? `Bearer ${currentUser.token}` : null,
      },
    };

    fetch(`${process.env.REACT_APP_API_URL}/users`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return [];
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch(() => { setError(true); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) { return <Loading />; }

  return (
    <div className="grid-container  ">
      <Navbar />
      <div className="page-wrapper">
        <h2 className="title-color">Lista de Usuarios</h2>

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
          <UsersList users={users} className="width-80" />
        ) : null }

        <div className="page-buttons width-80">
          <ButtonBack />
        </div>
      </div>
    </div>
  );
}

export default ShowUsersPage;
