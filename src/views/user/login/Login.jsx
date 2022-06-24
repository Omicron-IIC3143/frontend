/* eslint-disable jsx-a11y/label-has-associated-control */
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Navbar from '../../../components/navbar/Navbar';
import Loading from '../../../components/loading/Loading';
import './Login.css';

const initialValues = {
  email: '',
  password: '',
};
const Login = function Login() {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { currentUser, handleUserLogin } = useAuth();

  const handleSubmit = async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, requestOptions);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const respuesta = await response.json();
      respuesta.user.token = respuesta.token;
      handleUserLogin(respuesta.user);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = function handleChange(event) {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  if (loading) {
    return <Loading />;
  }

  if (currentUser) return <Navigate to="/" />;

  return (
    <div>
      <div className="grid-container  ">
        <div>
          <Navbar />
        </div>
        <div className="page-wrapper">
          <div className="card-profile-login-form">
            <h2 className="title-login-user">Ingresa a tu cuenta</h2>
            <form onSubmit={handleSubmit}>
              <div className="label-form-login">
                <p className="control has-icons-left has-icons-right">
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope icon-width" />
                  </span>
                  <input className="label-content" type="email" id="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
                </p>
              </div>

              <div className="label-form-login">
                <p className="control has-icons-left">
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock icon-width" />
                  </span>
                  <input className="label-content" type="password" name="password" id="password" placeholder="Contraseña" value={values.password} onChange={handleChange} />
                </p>
              </div>

              <br />

              <div className="label-form-login">
                <Button className="button-submit-login-user" id="loginButton" type="submit" disabled={!(values.email && values.password)}>
                  Login
                </Button>
              </div>
            </form>
          </div>
          {errorMessage ? (
            <p>Email o contraseña incorrecta</p>
          ) : (<> </>)}
        </div>
      </div>
    </div>
  );
};

export default Login;
