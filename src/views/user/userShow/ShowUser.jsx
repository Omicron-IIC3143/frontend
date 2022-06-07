import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Navbar from '../../../components/navbar/Navbar';
import './ShowUser.css';
import { UserShow } from '../../../components/user/userShow';
import { ButtonUpdatingUser } from '../../../components/user/updateButton';
import { ButtonBack } from '../../../components/buttons/buttonBack/ButtonBack';

function ShowUser() {
  const { currentUser } = useAuth();
  //   const navigate = useNavigate();
  return (
    <div>
      <div className="grid-container-show-user">
        <div>
          <Navbar />
        </div>
        <div className="flex-show-user">
          <UserShow
            name={currentUser?.name}
            description={currentUser?.description}
            rut={currentUser?.rut}
            money={currentUser?.money}
            email={currentUser?.email}
          />
          <ButtonUpdatingUser />
          {' '}
          <ButtonBack />
        </div>
      </div>
    </div>
  );
}

export default ShowUser;
