/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';
import './UserForm.css';
import ButtonBack from '../buttons/buttonBack/ButtonBack';

function UserForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { currentUser, handleUserLogin } = useAuth();
  let user = currentUser;

  // Source https://cesarg.cl/validador-de-rut-chileno-con-javascript/
  const rutValidator = {
    // Valida el rut con su cadena completa "XXXXXXXX-X"
    validaRut: (rutCompleto) => {
      if (!rutCompleto && !user) { return false; }
      if ((rutCompleto == '' || !rutCompleto) && user) { return true; }

      rutCompleto = rutCompleto.replace(/\./g, '');
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) {
        return false;
      }
      const tmp = rutCompleto.split('-');
      let digv = tmp[1];
      const rut = tmp[0];
      if (digv === 'K') digv = 'k';
      return (rutValidator.dv(rut) == digv);
    },
    dv: (T) => {
      let M = 0;
      let S = 1;
      for (;T; T = Math.floor(T / 10)) {
        // eslint-disable-next-line no-plusplus
        S = (S + T % 10 * (9 - M++ % 6)) % 11;
      }
      return S ? S - 1 : 'k';
    },
  };

  // eslint-disable-next-line func-names
  Yup.addMethod(Yup.string, 'validateRUT', function (errorMessage) {
    // eslint-disable-next-line react/no-this-in-sfc
    this.test('test-valid-RUT', errorMessage, (value) => {
      const { path, createError } = this;
      return (rutValidator.validaRut(value)
                    || createError({ path, message: errorMessage })
      );
    });
  });

  const validationSchemaRegister = Yup.object({
    name: Yup.string()
      .min(2, 'Tu nombre debe tener 2 o más carácteres')
      .max(20, 'Tu nombre debe tener 20 o menos carácteres')
      .required('Tu nombre es requerido'),
    email: Yup.string()
      .email('Correo electrónico inválido')
      .required('Correo electrónico es requerido'),
    rut: Yup.string()
      .required('Tu RUT es requerido')
      .validateRUT('Debes colocar tu RUT correctamente'),
    description: Yup.string()
      .max(300, 'Tu descripción no debe superar los 300 carácteres'),
    password: Yup.string()
      .min(6, 'Contraseña debe tener 6 o más carácteres')
      .max(15, 'Contraseña debe tener 15 o menos carácteres')
      .required('Password is required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Contraseñas deben coincidir')
      .required('La confirmación de contraseña es requerida'),
    acceptTerms: Yup.boolean()
      .oneOf([true], 'Debes aceptar los términos y condiciones')
      .required('Debes aceptar los términos y condiciones'),
  });
  const validationSchemaUpdater = Yup.object({
    name: Yup.string()
      .min(2, 'Tu nombre debe tener 2 o más carácteres')
      .max(20, 'Tu nombre debe tener 20 o menos carácteres'),
    email: Yup.string()
      .email('Correo electrónico inválido'),
    rut: Yup.string()
      .validateRUT('Debes colocar tu RUT correctamente'),
    description: Yup.string()
      .max(300, 'Tu descripción no debe superar los 300 carácteres'),
    password: Yup.string()
      .min(6, 'Contraseña debe tener 6 o más carácteres')
      .max(15, 'Contraseña debe tener 15 o menos carácteres')
      .oneOf([Yup.ref('passwordConfirm'), null], 'Contraseñas deben coincidir'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Contraseñas deben coincidir'),
    acceptTerms: Yup.boolean()
      .oneOf([true], 'Debes aceptar los términos y condiciones')
      .required('Debes aceptar los términos y condiciones'),
  });

  const initialValues = {
    name: '',
    email: '',
    rut: '',
    description: '',
    password: '',
    passwordConfirm: '',
    acceptTerms: false,
  };

  const placeholders = {
    name: user ? user.name : 'Nombre completo',
    email: user ? user.email : 'email.de.ejemplo@mailer.cl',
    rut: user ? user.rut : '30686957-4',
    description: user ? user.description : 'Descripción de ti (max. 300 caracteres)',
    password: 'Contraseña',
    passwordConfirm: 'Contraseña reingresada',
  };

  const validationSchema = user ? validationSchemaUpdater : validationSchemaRegister;

  const valueStriper = (values) => {
    const finalValues = {};
    Object.keys(values).forEach((key) => {
      if (values[key] != '') { finalValues[key] = values[key]; }
    });
    return finalValues;
  };
  return (
    <div className="card-profile-register-form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setLoading(true);
          values.rut = values.rut.replace(/\./g, '');
          values = valueStriper(values);
          const requestOptions = {
            method: user ? 'PUT' : 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: user ? `Bearer ${user.token}` : null,
            },
            body: JSON.stringify(values),
          };

          try {
            const path = user ? user.id : 'register';
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${path}`, requestOptions);
            if (!response.ok) {
              const error = await response.text();
              throw new Error(error);
            }
            const respuesta = await response.json();
            const { token } = user;
            user = respuesta.user;
            user.token = token;
            handleUserLogin(user);
            const successMessage = user ? 'Usuario modificado satisfactoriamente' : 'Usuario creado satisfactoriamente';
            setMessage(successMessage);
          } catch (error) {
            setMessage(error.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="label-form">
              <label className="label-content" htmlFor="name">Nombre: </label>
              <Field className="center-info-register-user" name="name" type="text" placeholder={placeholders.name} />
              {errors.name && touched.name && (
                <div className="error">{errors.name}</div>
              )}
            </div>

            <div className="label-form">
              <label className="label-content" htmlFor="email">Email: </label>
              <Field className="center-info-register-user" name="email" type="email" placeholder={placeholders.email} />
              {errors.email && touched.email && (
                <div className="error">{errors.email}</div>
              )}
            </div>

            <div className="label-form">
              <label className="label-content" htmlFor="rut">RUT: </label>
              <Field className="center-info-register-user" name="rut" type="text" placeholder={placeholders.rut} />
              {errors.rut && touched.rut && (
                <div className="error">{errors.rut}</div>
              )}
            </div>

            <div className="label-form">
              <label className="label-content" htmlFor="description">Descripción: </label>
              <Field className="center-info-register-user" name="description" type="description" placeholder={placeholders.description} />
              {errors.description && touched.description && (
                <div className="error">{errors.description}</div>
              )}
            </div>

            <div className="label-form">
              <label className="label-content" htmlFor="password">Contraseña: </label>
              <Field className="center-info-register-user" name="password" type="password" placeholder={placeholders.password} />
              {errors.password && touched.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>

            <div className="label-form">
              <label className="label-content" htmlFor="passwordConfirm">Confirmar contraseña: </label>
              <Field className="center-info-register-user" name="passwordConfirm" type="password" placeholder={placeholders.passwordConfirm} />
              {errors.passwordConfirm && touched.passwordConfirm && (
                <div className="error">{errors.passwordConfirm}</div>
              )}
            </div>

            <div className="label-form">
              <label className="label-content-terms-and-conditions" htmlFor="acceptTerms">
                <Field className="center-info-register-user" name="acceptTerms" type="checkbox" />
                Acepto los términos y condiciones de Social Starter.
              </label>
              {errors.acceptTerms && touched.acceptTerms && (
                <div className="error">{errors.acceptTerms}</div>
              )}
            </div>

            {!loading ? (
              <div className="label-form">
                <div className="button-submit-register-user">
                  <Button variant="primary" type="submit">Registrarse</Button>
                  {' '}
                  <ButtonBack />
                </div>
              </div>
            ) : (
              <div>
                <p>Cargando ...</p>
              </div>
            )}
          </Form>
        )}
      </Formik>
      <p>{message}</p>
    </div>
  );
}

export default UserForm;
