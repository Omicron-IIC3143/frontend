/* eslint-disable no-alert */
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import useAuth from '../../../hooks/useAuth';
import stringDateOfTomorrow from '../../../hooks/stringDateOfTomorrow';
import './RegisterProjectForm.css';
import ButtonBack from '../../buttons/buttonBack/ButtonBack';
import options from './SelectOptions';

/*
Para ayudarse con alguna modificación del Select
Source: https://gist.github.com/hubgit/e394e9be07d95cd5e774989178139ae8?permalink_comment_id=3487405#gistcomment-3487405
*/

function RegisterProjectForm() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'El nombre debe tener 2 o más caracteres.')
      .max(100, 'El nombre debe tener 100 caracteres o menos.')
      .required('El nombre del proyecto es obligatorio.'),
    description: Yup.string()
      .min(60, 'Tu descripción debe tener mínimo 60 caracteres.')
      .max(430, 'Tu descripción debe tener máximo 430 caracteres.')
      .required('La descripción es obligatoria.'),
    pictureUrl: Yup.string()
      .required('EL campo de imagen asociada al proyecto es obligatorio.'),
    company: Yup.string()
      .max(50, 'Nombre de empresa es muy largo. Máximo 50 caracteres.')
      .required('El nombre de la empresa, fundación u organización es obligatorio.'),
    topic: Yup.string()
      .required('El rubro relacionado al proyecto es obligatorio.'),
    tags: Yup.array()
      .min(1, 'Debes seleccionar al menos un tag'),
    goalAmount: Yup.number()
      .required('La meta monetaria es obligatoria.'),
    date: Yup.date()
      .required('Este campo es obligatorio.')
      .min(stringDateOfTomorrow(), 'Debes ingresar una fecha igual o siguiente a la que corresponde el día de mañana.'),
  });

  return (
    <div className="form center-content-x width-100">
      <Formik
        enableReinitialize
        initialValues={{
          name: '',
          description: '',
          pictureUrl: '',
          company: '',
          topic: '',
          tags: [],
          goalAmount: '',
          date: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const newValues = {
            ...values,
            userId: currentUser.id,
            currentAmount: 0,
          };
          newValues.tags = values.tags.map((item) => item.value);
          setLoading(true);
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentUser?.token}`,
              // 'Access-Control-Allow-Origin': `${window.location.hostname}`,
              // 'Sec-Fetch-Mode': 'no-cors',
              'Sec-Fetch-Mode': 'cors',
            },
            body: JSON.stringify(newValues),
          };
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/new`, requestOptions); // OJO AQUI FALTA SETEAR ESTO
            if (!response.ok) {
              const error = await response.text();
              throw new Error(error);
            }
            alert('Postulación creada correctamente.');
            navigate(`/users/${currentUser.id}/projects`);
          } catch (error) {
            setMessage(error.message);
          } finally {
            setLoading(false);
          }
        }}

      >
        {(kwargs) => {
          const {
            errors,
            touched,
            values,
            handleSubmit,
            handleBlur,
            setFieldValue,
          } = kwargs;
          return (
            <div className="card-profile-register-project-form width-80 margin-bottom-m">
              <Form onSubmit={handleSubmit}>
                <div className="label-form-register-project">
                  <label className="label-content-register-project" htmlFor="name">Nombre del proyecto: </label>
                  <Field className="center-info-register-project" name="name" type="text" placeholder="Nombre proyecto" />
                  {errors.name && touched.name && (
                    <div className="validation-error-register-project">{errors.name}</div>
                  )}
                </div>

                <div className="label-form-register-project">
                  <label className="label-content-register-project-description" htmlFor="description">Descripción: </label>
                  <Field className="center-info-register-project-description" as="textarea" name="description" type="text" placeholder="¿En qué consiste, qué busca?" />
                  {errors.description && touched.description && (
                    <div className="validation-error-register-project">{errors.description}</div>
                  )}
                </div>

                <div className="label-form-register-project">
                  <label className="label-content-register-project" htmlFor="pictureUrl">Imagen: </label>
                  <Field className="center-info-register-project" name="pictureUrl" type="url" placeholder="URL de la imagen" />
                  {errors.pictureUrl && touched.pictureUrl && (
                    <div className="validation-error-register-project">{errors.pictureUrl}</div>
                  )}
                </div>

                <div className="label-form-register-project">
                  <label className="label-content-register-project" htmlFor="company">Empresa: </label>
                  <Field className="center-info-register-project" name="company" type="text" placeholder="Empresa, fundación u organización" />
                  {errors.company && touched.company && (
                    <div className="validation-error-register-project">{errors.company}</div>
                  )}
                </div>

                <div className="label-form-register-project">
                  <label className="label-content-register-project" htmlFor="topic">Rubro: </label>
                  <Field className="center-info-register-project" name="topic" type="text" placeholder="Área relacionada con la causa del proyecto" />
                  {errors.topic && touched.topic && (
                    <div className="validation-error-register-project">{errors.topic}</div>
                  )}
                </div>

                <div className="label-form-register-project">
                  <label className="label-content-register-project" htmlFor="tags">Tags: </label>
                  <Select
                    isMulti
                    id="tags"
                    name="tags"
                    className="center-info-register-project"
                    type="text"
                    value={values.tags}
                    onBlur={handleBlur}
                    options={options}
                    placeholder="Presiona para agregar tags y en la 'x' para deseleccionar"
                    onChange={(option) => {
                      const optionsTags = [...values.tags];
                      if (!(option in optionsTags)) { optionsTags.push(option); }
                      setFieldValue('tags', option);
                    }}
                  />
                  {errors.tags && touched.tags && (
                    <div className="validation-error-register-project">{errors.tags}</div>
                  )}
                </div>
                <div className="label-form-register-project">
                  <label className="label-content-register-project" htmlFor="goalAmount">Meta monetaria: </label>
                  <Field className="center-info-register-project" name="goalAmount" type="number" placeholder="CLP" />
                  {errors.goalAmount && touched.goalAmount && (
                    <div className="validation-error-register-project">{errors.goalAmount}</div>
                  )}
                </div>

                <div className="label-form-register-project">
                  <label className="label-content-register-project" htmlFor="date">Tiempo límite: </label>
                  <Field className="center-info-register-project" name="date" type="date" placeholder="Cantidad de días desde hoy" />
                  {errors.date && touched.date && (
                    <div className="validation-error-register-project">{errors.date}</div>
                  )}
                </div>
                {!loading ? (
                  <div className="label-form-register-project button-submit-register-project page-buttons margin-bottom-s">
                    <ButtonBack />
                    <Button variant="primary" type="submit">Enviar postulación</Button>
                  </div>
                ) : (
                  <div>
                    <p>Loading...</p>
                  </div>
                )}
              </Form>
            </div>
          );
        }}
      </Formik>
      <p>{message}</p>
    </div>
  );
}

export default RegisterProjectForm;
