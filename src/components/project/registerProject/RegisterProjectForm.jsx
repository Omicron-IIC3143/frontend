import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import './RegisterProjectForm.css';
import ButtonBack from '../../buttons/buttonBack/ButtonBack';
import useAuth from '../../../hooks/useAuth';

function stringDateOfToday() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const stringToday = `${yyyy}-${mm}-${dd}`;
  return stringToday;
}

function RegisterProjectForm() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'El nombre debe tener mas de 2 caracteres.')
      .max(50, 'El nombre debe tener 50 caracteres o menos.')
      .required('El nombre del proyecto es obligatorio.'),
    description: Yup.string()
      .min(40, 'Tu descripción debe tener mínimo 40 caracteres.')
      .max(430, 'Tu descripción debe tener máximo 430 caracteres.')
      .required('La descripción es obligatoria.'),
    pictureUrl: Yup.string()
      .required('EL campo de imagen asociada al proyecto es obligatorio.'),
    company: Yup.string()
      .max(50, 'Nombre de empresa es muy largo. Máximo 50 caracteres.')
      .required('El nombre de la empresa, fundación u organización es obligatorio.'),
    topic: Yup.string()
      .required('El rubro relacionado al proyecto es obligatorio.'),
    goalAmount: Yup.number()
      .required('La meta monetaria es obligatoria.'),
    date: Yup.date()
      .required('Este campo es obligatorio.')
      .min(stringDateOfToday(), 'Estás ingresando una fecha del pasado'),
  });

  return (
    <div className="form">
      <Formik
        initialValues={{
          name: '',
          description: '',
          pictureUrl: '',
          company: '',
          topic: '',
          goalAmount: '',
          date: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const newValues = {
            ...values,
            userId: currentUser.id,
            tags: 'tag-1',
            currentAmount: 0,
          };
          setLoading(true);
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentUser?.token}`,
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
            setMessage('Postulación creada correctamente.');
            navigate(`/users/${currentUser.id}/projects`);
          } catch (error) {
            setMessage(error.message);
          } finally {
            setLoading(false);
          }
        }}

      >
        {({ errors, touched }) => (
          <div className="card-profile-register-project-form">
            <Form>
              <div className="label-form-register-project">
                <label className="label-content-register-project" htmlFor="name">Nombre del proyecto: </label>
                <Field className="center-info-register-project" name="name" type="text" placeholder="Nombre proyecto" />
                {errors.name && touched.name && (
                  <div className="validation-error-register-project">{errors.name}</div>
                )}
              </div>

              <div className="label-form-register-project">
                <label className="label-content-register-project-description" htmlFor="description">Descripción: </label>
                <Field className="center-info-register-project-description" as="textarea" name="description" type="text" placeholder="Descripción" />
                {errors.description && touched.description && (
                  <div className="validation-error-register-project">{errors.description}</div>
                )}
              </div>

              <div className="label-form-register-project">
                <label className="label-content-register-project" htmlFor="pictureUrl">Imagen: </label>
                <Field className="center-info-register-project" name="pictureUrl" type="text" placeholder="URL de la imagen" />
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
                <Field className="center-info-register-project" name="topic" type="text" placeholder="Rubro" />
                {errors.topic && touched.topic && (
                  <div className="validation-error-register-project">{errors.topic}</div>
                )}
              </div>

              <div className="label-form-register-project">
                <label className="label-content-register-project" htmlFor="goalAmount">Meta monetaria: </label>
                <Field className="center-info-register-project" name="goalAmount" type="number" placeholder="Pesos chilenos" />
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
                <div className="label-form-register-project">
                  <div className="button-submit-register-project">
                    <Button variant="primary" type="submit">Enviar postulación</Button>
                    {' '}
                    <ButtonBack />
                  </div>
                </div>
              ) : (
                <div>
                  <p>Loading...</p>
                </div>
              )}
            </Form>
          </div>
        )}
      </Formik>
      <p>{message}</p>
    </div>
  );
}

export default RegisterProjectForm;
