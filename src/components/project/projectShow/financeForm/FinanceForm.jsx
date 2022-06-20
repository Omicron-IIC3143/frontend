/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../../../hooks/useAuth';
// import Loading from '../../..//loading/Loading';
import ButtonFinancing from '../buttons/buttonFinancing/ButtonFinancing';
import './FinanceForm.css';

function FinanceForm(currentAmount, setCurrentAmount) {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [user, setUser] = useState([]);
  const [error, setError] = useState(false);
  //   const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    // setLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser?.token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/users/${currentUser?.id}`, requestOptions)
      .then(async (response) => {
        if (!response.ok) {
          setError(true);
          return null;
        }
        const respuesta = await response.json();
        setUser(respuesta);
        return respuesta;
      })
      .catch(() => { setError(true); });
    //   .finally(() => setLoading(false));
  }, []);

  const validationSchema = Yup.object({
    money: Yup.number()
      .min(0, `Elige un monto entre 0 y tu saldo actual (${user?.money})`)
      .max(user?.money, `Elige un monto entre 0 y tu saldo actual (${user?.money})`),
  });

  return (
    <div>
      <Formik
        initialValues={{
          financeAmount: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          // eslint-disable-next-line no-param-reassign
          values.financeAmount += currentAmount;
          const requestOptions = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentUser?.token}`,
            },
            body: JSON.stringify(values),
          };
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, requestOptions); // OJO AQUI FALTA SETEAR ESTO
            if (!response.ok) {
              const errorRequest = await response.text();
              throw new Error(errorRequest);
            }
            setMessage('Aporte hecho exitosamente. ¡Felicitaciones por ayudar con la causa del proyecto!');
            setCurrentAmount(values.financeAmount);
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
              <label htmlFor="financeAmount" className="label-ingrese-monto">Ingrese el monto: </label>
              <Field name="financeAmount" type="number" className="caja-para-ingesar-monto" placeholder="Monto a aportar" />
              {errors.financeAmount && touched.financeAmount && (
              <div className="validation-error">{errors.financeAmount}</div>
              )}
            </div>
            <div>
              <ButtonFinancing />
            </div>

          </Form>
        )}
      </Formik>
      <p className="message">{message}</p>
      {error && <p>Algo salió mal, inténtalo nuevamente :(</p>}
    </div>
  );
}

export default FinanceForm;
