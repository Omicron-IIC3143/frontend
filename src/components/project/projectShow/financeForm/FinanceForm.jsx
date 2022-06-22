/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../../../hooks/useAuth';
// import Loading from '../../..//loading/Loading';
import ButtonFinancing from '../buttons/buttonFinancing/ButtonFinancing';
import './FinanceForm.css';

function FinanceForm({ currentAmount, setCurrentAmount, userAmount }) {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  // const [user, setUser] = useState([]);
  const [error, setError] = useState(false);
  //   const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const validationSchema = Yup.object({
    money: Yup.number()
      .min(0, `Elige un monto entre 0 y tu saldo actual (${userAmount})`)
      .max(userAmount, `Elige un monto entre 0 y tu saldo actual (${userAmount})`),
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
