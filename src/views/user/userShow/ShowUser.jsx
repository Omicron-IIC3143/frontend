import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Navbar from '../../../components/navbar/Navbar';
import './ShowUser.css';
import { UserShow } from '../../../components/user/userShow/UserShow';
import { ButtonUpdatingUser } from '../../../components/user/buttons/updateButton/UpdateButton';
import { DeleteButton } from '../../../components/user/buttons/deleteButton/DeleteButton';
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

  if (currentUser?.isAdmin == true) {
    if (currentUser?.id == id) {
      return (
        (loading == true) ? (
          <Loading />) : (
            <>
            </>
        ),
        (error) ? (
          <div className="flex-inside">
            <h2>
              Error
              {error}
            </h2>
          </div>
        ) : (
          <div>
            <div className="grid-container-show-user">
              <div>
                <Navbar />
              </div>
              <div className="flex-show-user">
                <UserShow
                  name={user?.name}
                  description={user?.description}
                  rut={user?.rut}
                  money={user?.money}
                  email={user?.email}
                  boolean={false}
                />
                <ButtonUpdatingUser />
                <DeleteButton />
                <ButtonBack />
              </div>
            </div>
          </div>
        ));
    }
    return (
      (loading == true) ? (
        <Loading />) : (
          <>
          </>
      ),
      (error) ? (
        <div className="flex-inside">
          <h2>
            Error
            {error}
          </h2>
        </div>
      ) : (
        <div>
          <div className="grid-container-show-user">
            <div>
              <Navbar />
            </div>
            <div className="flex-show-user">
              <UserShow
                name={user?.name}
                description={user?.description}
                rut={user?.rut}
                money={user?.money}
                email={user?.email}
              />
              <ButtonUpdatingUser />
              <DeleteButton />
              <ButtonBack />
            </div>
          </div>
        </div>
      ));
  }
  if (currentUser?.id == id) {
    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div>
        <div className="grid-container-show-user">
          <div>
            <Navbar />
          </div>
          {error ? (
            <div className="flex-inside">
              <h4>
                {error.errors}
              </h4>
            </div>
          ) : (
            <div className="flex-show-user">
              <UserShow
                name={user?.name}
                description={user?.description}
                rut={user?.rut}
                money={user?.money}
                email={user?.email}
              />
              <ButtonUpdatingUser />
              <DeleteButton />
              <ButtonBack />
            </div>
          )}
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
        <h1 className="unauthorizedMessageFinancialInfo">No estás autorizado para ver el perfil de otro usuario. </h1>
      </div>
    </div>
  );
}

export default ShowUser;
