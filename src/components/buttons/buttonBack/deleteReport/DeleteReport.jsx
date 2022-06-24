/* eslint-disable no-alert */
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';

function DeleteReport({ report }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="form">
      <Formik
        initialValues={{ acceptTerms: false }}
        validationSchema={Yup.object({
          acceptTerms: Yup.boolean()
            .oneOf([true], 'Debes aceptar la eliminación del reporte')
            .required('Debes aceptar la eliminación del reporte'),
        })}
        onSubmit={async (values) => {
          setLoading(true);
          const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${currentUser?.token}` },
            body: JSON.stringify(values),
          };
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/report/delete/${report.id}`, requestOptions);
            if (!response.ok) {
              const error = await response.text();
              throw new Error(error);
            }
            const successMessage = 'Reporte eliminado satisfactoriamente';
            setMessage(successMessage);
            alert(successMessage);
            navigate(`/projects/${report.projectId}`);
          } catch (error) {
            setMessage(error.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex">
            <div className="flex-form-fields label-form-user">
              <label className="label-content-form-user terms-and-conditions-form-user" htmlFor="acceptTerms">
                <Field className="center-info-register-user" name="acceptTerms" type="checkbox" />
                Acepto eliminar este reporte de Social Starter
              </label>
              {errors.acceptTerms && touched.acceptTerms && (
                <div className="error-form-user">{errors.acceptTerms}</div>
              )}
            </div>
            { currentUser && !loading ? (
              <div className="flex-form-fields label-form-user">
                <button type="submit" className="btn btn-danger">Eliminar Reporte</button>
              </div>
            ) : null}

            { currentUser && loading ? (
              <div className="flex-form-fields">
                <p className="final-message-form-user">Cargando ...</p>
              </div>
            ) : null }
          </Form>
        )}
      </Formik>
      <p className="final-message-form-user">{message}</p>
    </div>
  );
}

export default DeleteReport;
