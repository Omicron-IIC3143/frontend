/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../../hooks/useAuth';
import DepositButton from '../buttons/depositButton/DepositButton';

function DepositForm({ money, setMoney }) {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();

  const validationSchema = Yup.object({
    money: Yup.number()
      .min(0, 'Elige un monto entre 0 y 1.000.000')
      .max(10000000, 'Elige un monto entre 0 y 1.000.000'),
  });

  return (
    <div>
      <Formik
        initialValues={{
          money: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          // eslint-disable-next-line no-param-reassign
          values.money += money;
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
            setMoney(values.money);
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
              <Field name="money" type="number" placeholder="Monto a depositar" />
              {errors.money && touched.money && (
              <div>{errors.money}</div>
              )}
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
}

export default DepositForm;
