// Para silenciar al hacer copy to clipboard con un p
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-alert */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import useAuth from '../../../hooks/useAuth';
import stringDateOfTomorrow from '../../../hooks/stringDateOfTomorrow';
import ButtonBack from '../../buttons/buttonBack/ButtonBack';
import options from '../registerProject/SelectOptions';

function UpdateProjectForm(projectParam) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const { project } = projectParam;

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'El nombre debe tener 2 o más caracteres.')
      .max(100, 'El nombre debe tener 100 caracteres o menos.'),
    description: Yup.string()
      .min(60, 'Tu descripción debe tener mínimo 60 caracteres.')
      .max(430, 'Tu descripción debe tener máximo 430 caracteres.'),
    pictureUrl: Yup.string()
      .url('Coloca un URL válido, con el "https://" inicial incluido'),
    company: Yup.string()
      .max(50, 'Nombre de organización muy largo. Máximo 50 caracteres.'),
    tags: Yup.array()
      .min(1, 'Debes seleccionar al menos un tag'),
    topic: Yup.string(),
    goalAmount: Yup.number(),
    date: Yup.date()
      .min(stringDateOfTomorrow(), 'Solo puedes ingresar una fecha desde mañana.'),
  });

  const initialValues = {
    name: '',
    description: '',
    pictureUrl: '',
    company: '',
    topic: '',
    tags: [],
    goalAmount: '',
    date: '',
  };

  const placeholders = {
    name: project.name,
    description: project.description,
    pictureUrl: project.pictureUrl,
    company: project.company,
    topic: project.topic,
    tags: project.tags,
    goalAmount: project.goalAmount,
    date: project.date,
  };
  const valueStriper = (values) => {
    const finalValues = {};
    Object.keys(values).forEach((key) => {
      if (values[key] != '' && values[key] != []) { finalValues[key] = values[key]; }
    });
    return finalValues;
  };
  return (
    <div className="form center-content-x width-100">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setLoading(true);
          values = valueStriper(values);
          values.currentState = 'pending';
          values.tags = values.tags.map((item) => item.value);

          const requestOptions = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentUser.token}`,
              'Sec-Fetch-Mode': 'cors',
            },
            body: JSON.stringify(values),
          };
          try {
            const path = project.id;
            const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${path}`, requestOptions);

            if (!response.ok) {
              const responseError = await response.text();
              throw new Error(responseError);
            }
            const successMessage = 'Proyecto modificado satisfactoriamente';
            alert(successMessage);
            navigate(-1);
          } catch (responseError) {
            setError(responseError.message);
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
                  <Field className="center-info-register-project" name="name" type="text" placeholder={placeholders.name} />
                  {errors.name && touched.name && (
                    <div className="validation-error-register-project">{errors.name}</div>
                  )}
                </div>

                <div className="label-form-register-project">
                  <label className="label-content-register-project-description" htmlFor="description">Descripción: </label>
                  <p className="copy-description" type="button" onClick={navigator.clipboard.writeText(placeholders.description)}>Click para Copiar descripción previa</p>
                  <Field className="center-info-register-project-description" as="textarea" name="description" type="text" placeholder={placeholders.description} />
                  {errors.description && touched.description && (
                    <div className="validation-error-register-project">{errors.description}</div>
                  )}
                </div>

                <div className="label-form-register-project">
                  <label className="label-content-register-project" htmlFor="pictureUrl">Imagen: </label>
                  <Field className="center-info-register-project" name="pictureUrl" type="url" placeholder={placeholders.pictureUrl} />
                  {errors.pictureUrl && touched.pictureUrl && (
                    <div className="validation-error-register-project">{errors.pictureUrl}</div>
                  )}
                </div>

                <div className="label-form-register-project">
                  <label className="label-content-register-project" htmlFor="company">Empresa: </label>
                  <Field className="center-info-register-project" name="company" type="text" placeholder={placeholders.company} />
                  {errors.company && touched.company && (
                    <div className="validation-error-register-project">{errors.company}</div>
                  )}
                </div>

                <div className="label-form-register-project">
                  <label className="label-content-register-project" htmlFor="topic">Rubro: </label>
                  <Field className="center-info-register-project" name="topic" type="text" placeholder={placeholders.topic} />
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
                    className="font-size-2 blue-boarders"
                    type="text"
                    value={values.tags}
                    onBlur={handleBlur}
                    options={options}
                    placeholder="Vuelve a colocarlos. Presiona para agregar tags y en la 'x' para deseleccionar"
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
                  <Field className="center-info-register-project" name="goalAmount" type="number" placeholder={`$${placeholders.goalAmount}`} />
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
                    <Button variant="primary" type="submit">Modificar proyecto</Button>
                  </div>
                ) : (
                  <div>
                    <p className="final-message-form-user">Actualizando proyecto...</p>
                  </div>
                )}
              </Form>
            </div>
          );
        }}
      </Formik>
      { error ? (
        <p className="final-message-form-user">No se pudo efectuar la operación</p>
      ) : (
        <> </>
      )}
    </div>
  );
}

export default UpdateProjectForm;
