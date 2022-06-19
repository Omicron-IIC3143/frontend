/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../../hooks/useAuth';
import DepositButton from '../buttons/depositButton/DepositButton';

const DepositForm = function DepositForm() {
  const { id } = useParams();
  //   const [loading, setLoading] = useState(false);
  //   const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [money, setMoney] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();

  const validationSchema = Yup.object({
    money: Yup.number()
      .min(0, 'Elige un monto entre 0 y 1000000')
      .max(10000000, 'Elige un monto entre 0 y 1000000'),
  });
  useEffect(() => {
    // setLoading(true);
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
      .finally();
    //   .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Formik
        initialValues={{
          money: user.money,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
        //   setLoading(true);
          const requestOptions = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentUser?.token}`,
            },
            body: JSON.stringify(values),
          };
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, requestOptions); // OJO AQUI FALTA SETEAR ESTO
            if (!response.ok) {
              const errorRequest = await response.text();
              throw new Error(errorRequest);
            }
            setMessage('Depósito hecho exitosamente');
          } catch (err) {
            setMessage(err.message);
            setError(false);
          } finally {
            // setLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="money">Ingrese el monto: </label>
              <Field name="money" type="text" placeholder="Monto a depositar" />
              {errors.money && touched.money && (
              <div>{errors.money}</div>
              )}
            </div>
            <div>
              <Field name="name" type="hidden" placeholder="Monto a depositar" />
            </div>
            <div>
              <Field name="rut" type="hidden" value={user.rut} />
            </div>
            <div>
              <Field name="email" type="hidden" value={user.email} />
            </div>
            <div>
              <Field name="password" type="hidden" value={user.password} />
            </div>
            <div>
              <Field name="pictureUrl" type="hidden" value={user.pictureUrl} />
            </div>
            <div>
              <Field name="description" type="hidden" value={user.description} />
            </div>

            <div>
              <DepositButton />
            </div>

          </Form>
        )}
      </Formik>
      <p>{message}</p>
      {error && <p>Something went wrong, please try again later :(</p>}
    </div>
  );
};

export default DepositForm;
