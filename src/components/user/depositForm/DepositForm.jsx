/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../../hooks/useAuth';
import DepositButton from '../buttons/depositButton/DepositButton';
import './DepositForm.css';

function DepositForm({ money, setMoney }) {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();

  const validationSchema = Yup.object({
    money: Yup.number()
      .min(1, 'Elige un monto entre $1 y $1.000.000')
      .max(1000000, 'Elige un monto entre $1 y $1.000.000'),
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
            setMessage('¡Depósito hecho exitosamente!');
            setMoney(values.money);
            window.location.reload();
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
              <label htmlFor="money" className="label-ingrese-monto">Ingrese monto a depositar: </label>
              <Field name="money" type="number" className="caja-para-ingesar-monto" placeholder="CLP" />
              {errors.money && touched.money && (
              <div className="validation-error">{errors.money}</div>
              )}
            </div>
            <div>
              <DepositButton />
            </div>

          </Form>
        )}
      </Formik>
      <p className="message">{message}</p>
      {error && <p>Algo salió mal, inténtalo nuevamente :(</p>}
    </div>
  );
}

export default DepositForm;
