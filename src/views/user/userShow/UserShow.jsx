import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Navbar from '../../../components/navbar/Navbar';
import './userShow.css';

const UserShow = function UserShow() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
      <div>
          <div className='grid-container'>
                <div>
                    <Navbar />
                </div>
                <div className='flex'>
                    <section className="container">
                        <br />
                        <h1 id="titleView">Información de usuario</h1>
                        <br />
                        <div className="card" id="boxShow">
                            <div className="card-image">
                            <figure>
                                <img id="image-show" src={currentUser?.picture} alt="la imagen q habria" />
                            </figure>
                            </div>
                            <div className="card-content">
                            <div className="media">

                                <div className="media-content">
                                <p className="title is-4">
                                    {currentUser?.name}
                                </p>
                                <p className="subtitle is-6">
                                    {currentUser?.rut}
                                    /
                                    {currentUser?.email}
                                </p>
                                </div>
                            </div>

                            <div className="content">
                                <p className="subtitle is-6">
                                <b>Saldo actual:</b>
                                {' '}
                                {currentUser?.money}
                                </p>
                                <p className="subtitle is-6">
                                <b>Imagen:</b>
                                {' '}
                                {currentUser?.picture}
                                </p>
                                <p className="subtitle is-6">
                                <b>Descripción:</b>
                                {' '}
                                {currentUser?.description}
                                </p>
                            </div>
                            </div>
                        </div>
                        <br />
                        <div>
                            <button onClick={() => navigate(-1)} type="button" className="button" id="backButton">Back</button>
                        </div>
                        <br />
                    </section>
                </div>
          </div>
      </div>
  );
};

export default UserShow;
