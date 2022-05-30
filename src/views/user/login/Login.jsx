/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const initialValues = {
  mail: '',
  password: '',
};
const Login = function Login() {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { currentUser, handleUserLogin } = useAuth();
  const navigate = useNavigate();

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
    return <h2>Loading...</h2>;
  }

  if (currentUser) return <Navigate to="/" />;

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1 id="login">Login with your account</h1>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input" type="email" id="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="password" name="password" id="password" placeholder="Password" value={values.password} onChange={handleChange} />
            <span className="icon is-small is-left">
              <i className="fas fa-lock" />
            </span>
          </p>
        </div>

        <div className="field">
          <button id="loginButton" type="submit" disabled={!(values.email && values.password)}>
            Login
          </button>
        </div>
      </form>
      <p>{errorMessage}</p>
      <div>
        <button onClick={() => navigate(-1)} type="button" className="button" id="backButton">Back</button>
      </div>
    </section>
  );
};

export default Login;
