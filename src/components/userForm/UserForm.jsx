/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
// import { Navigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';
import './UserForm.css';
import ButtonBack from '../buttons/buttonBack/ButtonBack';
import DeleteUser from '../deleteUser/DeleteUser';

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

  function isValidRUT(errorMessage) {
    // eslint-disable-next-line react/no-this-in-sfc
    return this.test(
      'test-valid-RUT',
      errorMessage,
      // eslint-disable-next-line func-names
      function (value) {
        const { path, createError } = this;
        return (rutValidator.validaRut(value)
                    || createError({ path, message: errorMessage })
        );
      },
    );
  }

  // eslint-disable-next-line func-names
  Yup.addMethod(Yup.string, 'validateRUT', isValidRUT);

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
      .required('Contraseña es requerida'),
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
  const textActionButton = user ? 'Actualizar usuario' : 'Registrarse';

  const valueStriper = (values) => {
    const finalValues = {};
    Object.keys(values).forEach((key) => {
      if (values[key] != '') { finalValues[key] = values[key]; }
    });
    return finalValues;
  };

  let isUpdating = Boolean(user);

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
            method: isUpdating ? 'PUT' : 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: isUpdating ? `Bearer ${user.token}` : null,
            },
            body: JSON.stringify(values),
          };

          try {
            const path = isUpdating ? user.id : 'register';
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${path}`, requestOptions);

            if (!response.ok) {
              const error = await response.text();
              throw new Error(error);
            }

            const respuesta = await response.json();
            user = respuesta.user;
            user.token = respuesta.token ? respuesta.token : currentUser.token;
            handleUserLogin(user);
            const successMessage = isUpdating ? 'Usuario modificado satisfactoriamente' : 'Usuario creado satisfactoriamente';
            setMessage(successMessage);
            isUpdating = !isUpdating;
          } catch (error) {
            setMessage(error.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="label-form-user">
              <label className="label-content-form-user" htmlFor="name">Nombre: </label>
              <Field className="center-info-register-user" name="name" type="text" placeholder={placeholders.name} />
              {errors.name && touched.name && (
                <div className="error-form-user">{errors.name}</div>
              )}
            </div>

            <div className="label-form-user">
              <label className="label-content-form-user" htmlFor="email">Email: </label>
              <Field className="center-info-register-user" name="email" type="email" placeholder={placeholders.email} />
              {errors.email && touched.email && (
                <div className="error-form-user">{errors.email}</div>
              )}
            </div>

            <div className="label-form-user">
              <label className="label-content-form-user" htmlFor="rut">RUT: </label>
              <Field className="center-info-register-user" name="rut" type="text" placeholder={placeholders.rut} />
              {errors.rut && touched.rut && (
                <div className="error-form-user">{errors.rut}</div>
              )}
            </div>

            <div className="label-form-user">
              <label className="label-content-form-user" htmlFor="description">Descripción: </label>
              <Field className="center-info-register-user" name="description" type="text" as="textarea" placeholder={placeholders.description} />
              {errors.description && touched.description && (
                <div className="error-form-user">{errors.description}</div>
              )}
            </div>

            <div className="label-form-user">
              <label className="label-content-form-user" htmlFor="password">Contraseña: </label>
              <Field className="center-info-register-user" name="password" type="password" placeholder={placeholders.password} />
              {errors.password && touched.password && (
                <div className="error-form-user">{errors.password}</div>
              )}
            </div>

            <div className="label-form-user">
              <label className="label-content-form-user" htmlFor="passwordConfirm">Confirmar contraseña: </label>
              <Field className="center-info-register-user" name="passwordConfirm" type="password" placeholder={placeholders.passwordConfirm} />
              {errors.passwordConfirm && touched.passwordConfirm && (
                <div className="error-form-user">{errors.passwordConfirm}</div>
              )}
            </div>

            <div className="label-form-user">
              <label className="label-content-form-user terms-and-conditions-form-user" htmlFor="acceptTerms">
                <Field className="center-info-register-user" name="acceptTerms" type="checkbox" />
                Acepto los términos y condiciones de Social Starter.
              </label>
              {errors.acceptTerms && touched.acceptTerms && (
                <div className="error-form-user">{errors.acceptTerms}</div>
              )}
            </div>

            {!loading ? (
              <div className="label-form-user">
                <div className="button-submit-register-user">
                  <Button variant="primary" type="submit">{textActionButton}</Button>
                  {' '}
                  <ButtonBack />
                </div>
              </div>
            ) : (
              <div>
                <p className="final-message-form-user">Cargando ...</p>
              </div>
            )}
          </Form>
        )}
      </Formik>
      <p className="final-message-form-user">{message}</p>
      { user ? (<DeleteUser />) : null }
      <p className="final-message-form-user">Para seguir en Social Starter, puedes cerrar esta pestaña o seguir modificando</p>
    </div>
  );
}

export default UserForm;
