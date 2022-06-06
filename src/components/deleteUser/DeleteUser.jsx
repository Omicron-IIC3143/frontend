import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const UserForm = function () {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { currentUser, handleUserLogin } = useAuth();
  let user = currentUser;

  return (
    <div className="form">
      <Formik
        initialValues={{ acceptTerms: false }}
        validationSchema={Yup.object({
          acceptTerms: Yup.boolean()
            .oneOf([true], 'Debes aceptar los términos y condiciones')
            .required('Debes aceptar los términos y condiciones'),
        })}
        onSubmit={async (values) => {
          setLoading(true);
          const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
            body: JSON.stringify(values),
          };
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/delete/${user.id}`, requestOptions);
            if (!response.ok) {
              const error = await response.text();
              throw new Error(error);
            }
            const successMessage = 'Usuario eliminado satisfactoriamente';
            handleUserLogin(null);
            user = null;
            setMessage(successMessage);
            // if (currentUser) return <Navigate to="/" />;
          } catch (error) {
            setMessage(error.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex">
            <div className="flex-form-fields">
              <label htmlFor="acceptTerms">
                <Field name="acceptTerms" type="checkbox" />
                Acepto eliminar mi usuario de Social Starter
              </label>
              {errors.acceptTerms && touched.acceptTerms && (
                <div className="error">{errors.acceptTerms}</div>
              )}
            </div>
            { user && !loading ? (
              <div className="flex-form-fields">
                <button type="submit">Eliminar Usuario</button>
              </div>
            ) : null}

            {user && !loading ? (
              null
            ) : (
              <div className="flex-form-fields">
                <p>Cargando ...</p>
              </div>
            )}
          </Form>
        )}
      </Formik>
      <p>{message}</p>
    </div>
  );
};
export default UserForm;