import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const UserForm = function () {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  //let user = null;
  let user = {
    "isAdmin": false,
    "money": 0,
    "id": 6,
    "name": "Felipe García",
    "email": "chinoinator4@uc.cl",
    "rut": "19794152-9",
    "description": "Probando 4 cuanta. Veremos si el PUT del Update puede cambiar las contraseñas",
    "password": "$2a$10$dusKYGZpjS9pijjq.UiVXeRtF2E1lWDckG36gBFjOIqw5TwSl2ATa",
    "updatedAt": "2022-05-30T07:29:13.541Z",
    "createdAt": "2022-05-30T07:29:13.541Z",
    "picture": null, 
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRmVsaXBlIEdhcmPDrWEiLCJlbWFpbCI6ImNoaW5vaW5hdG9yNEB1Yy5jbCIsInJ1dCI6IjE5Nzk0MTUyLTkiLCJkZXNjcmlwdGlvbiI6IlByb2JhbmRvIDQgY3VhbnRhLiBWZXJlbW9zIHNpIGVsIFBVVCBkZWwgVXBkYXRlIHB1ZWRlIGNhbWJpYXIgbGFzIGNvbnRyYXNlw7FhcyIsInBhc3N3b3JkIjoiJDJhJDEwJGR1c0tZR1pwalM5cGlqanEuVWlWWGVSdEYyRTFsV0Rja0czNmdCRmpPSXF3NVR3U2wyQVRhIiwicGFzc3dvcmRDb25maXJtIjoiY2hpbm9pbmF0b3I0IiwiYWNjZXB0VGVybXMiOnRydWUsImlhdCI6MTY1Mzg5NTc1Mywic3ViIjoiNiJ9.5onTnEyky9H5a_3w-bQD7fkIVnXq9cdlUpWsjTXLURA"
  }

  // Source https://cesarg.cl/validador-de-rut-chileno-con-javascript/
  let rutValidator = {
    // Valida el rut con su cadena completa "XXXXXXXX-X"
    validaRut : function (rutCompleto) {
      if (!rutCompleto && !user) { return false };
      if ((rutCompleto == '' || !rutCompleto) && user) {return true }; 

      rutCompleto = rutCompleto.replace(/\./g,'');
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
        return false;
      let tmp 	= rutCompleto.split('-');
      let digv	= tmp[1]; 
      let rut 	= tmp[0];
      if ( digv === 'K' ) digv = 'k' ;
      return (rutValidator.dv(rut) == digv );
    },
    dv : function(T){
      let M=0,S=1;
      for(;T;T=Math.floor(T/10))
        S=(S+T%10*(9-M++%6))%11;
      return S?S-1:'k';
    }
  };

  Yup.addMethod(Yup.string, 'validateRUT', function (errorMessage){
      return this.test('test-valid-RUT', errorMessage, function (value) {
          const { path, createError } = this;

          return ( rutValidator.validaRut(value) ||
                 createError({path, message: errorMessage})
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

  let initialValues = {
    name: '',
    email: '',
    rut: '',
    description: '',
    password: '',
    passwordConfirm: '',
    acceptTerms: false,
  };

  let placeholders = {
    name: user ? user.name : 'Nombre Completo',
    email: user ? user.email : 'email.de.ejemplo@mailer.cl',
    rut: user ? user.rut : '30686957-4',
    description: user ? user.description : 'Descripción de ti (max. 300 carácteres)',
    password: 'Contraseña',
    passwordConfirm: 'Contraseña Reingresada',
  }
  console.log('Fuera return con user ', user, user ? 'siuuu': 'ñao ñao')
  let validationSchema = user ? validationSchemaUpdater : validationSchemaRegister;

  const valueStriper = function (values) {
    let finalValues = {};
    Object.keys(values).forEach( key => {
      if (values[key] != '') { finalValues[key] = values[key] };
    });
    return finalValues;
  };
  
  return (
    <div className="form">
      <Formik
        initialValues={ initialValues }
        validationSchema={ validationSchema }
        onSubmit={async (values) => {
          setLoading(true);
          values.rut = values.rut.replace(/\./g,'');
          values = valueStriper(values);
          const requestOptions = {
            method: user ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.token },
            body: JSON.stringify(values),
          };
          try {
            let path = user ? user.id : 'register';
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${path}`, requestOptions);
            if (!response.ok) {
              const error = await response.text();
              throw new Error(error);
            }
            let successMessage = user ? 'Usuario modificado satisfactoriamente': 'Usuario creado satisfactoriamente';
            setMessage(successMessage);
          } catch (error) {
            setMessage(error.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className='flex'>
            <div className='flex-form-fields'>
              <label htmlFor="name">Nombre</label>
              <Field name="name" type="text" placeholder={placeholders.name} />
              {errors.name && touched.name && (
                <div className="error">{errors.name}</div>
              )}
            </div>

            <div className='flex-form-fields'>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" placeholder={placeholders.email} />
              {errors.email && touched.email && (
                <div className="error">{errors.email}</div>
              )}
            </div>

            <div className='flex-form-fields'>
              <label htmlFor="rut">RUT</label>
              <Field name="rut" type="text" placeholder={placeholders.rut} />
              {errors.rut && touched.rut && (
                <div className="error">{errors.rut}</div>
              )}
            </div>

            <div className='flex-form-fields'>
              <label htmlFor="description">Descripción</label>
              <Field name="description" type="description" placeholder={placeholders.description} />
              {errors.description && touched.description && (
                <div className="error">{errors.description}</div>
              )}
            </div>

            <div className='flex-form-fields'>
              <label htmlFor="password">Contraseña</label>
              <Field name="password" type="password" placeholder={placeholders.password} />
              {errors.password && touched.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>

            <div className='flex-form-fields'>
              <label htmlFor="passwordConfirm">Confirmar Contraseña</label>
              <Field name="passwordConfirm" type="password" placeholder={placeholders.passwordConfirm} />
              {errors.passwordConfirm && touched.passwordConfirm && (
                <div className="error">{errors.passwordConfirm}</div>
              )}
            </div>

            <div className='flex-form-fields'>
              <label htmlFor="acceptTerms">
                <Field name="acceptTerms" type="checkbox" />
                Acepto los términos y condiciones de Social Starter
              </label>
              {errors.acceptTerms && touched.acceptTerms && (
                <div className="error">{errors.acceptTerms}</div>
              )}
            </div>

            {!loading ? (
              <div className='flex-form-fields'>
                <button type="submit">Confirmar Cambios</button>
              </div>
            ) : (
              <div className='flex-form-fields'>
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
