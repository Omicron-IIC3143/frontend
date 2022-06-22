/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../../../hooks/useAuth';
import convertMoneyToString from '../../../../hooks/convertNumber';
// import Loading from '../../..//loading/Loading';
import ButtonFinancing from '../buttons/buttonFinancing/ButtonFinancing';
import './FinanceForm.css';

function FinanceForm({ currentAmount, setCurrentAmount }) {
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
    if (currentUser) {
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
      // .finally(() => setLoading(false));
    }
  }, []);

  const validationSchema = Yup.object({
    financeAmount: Yup.number()
      .min(1, `Elige un monto entre $1 y tu saldo actual ($${convertMoneyToString(user?.money)})`)
      .max(user?.money, `Elige un monto entre $1 y tu saldo actual ($${convertMoneyToString(user?.money)})`),
  });

  return (
    <div>
      <Formik
        initialValues={{
          financeAmount: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const finalValues = {
            amount: values.financeAmount,
            userId: currentUser.id,
            projectId: id,
          };
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentUser?.token}`,
            },
            body: JSON.stringify(finalValues),
          };
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/finance/new`, requestOptions);
            if (!response.ok) {
              const errorRequest = await response.text();
              throw new Error(errorRequest);
            }
            setMessage('Aporte hecho exitosamente. ¡Felicitaciones por ayudar con la causa del proyecto!');
            setCurrentAmount(currentAmount + finalValues.amount);
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
            <div className="card-finance-form">
              <div className="center-div">
                <label htmlFor="financeAmount" className="label-ingrese-monto-finance">Ingrese el monto a aportar: </label>
                <Field name="financeAmount" type="number" className="caja-para-ingesar-monto-finance" placeholder="CLP" />
              </div>
              {errors.financeAmount && touched.financeAmount && (
              <div className="validation-error">{errors.financeAmount}</div>
              )}
              <div className="center-div">
                <ButtonFinancing />
              </div>
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
