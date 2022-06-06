import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import './RegisterProjectForm.css'

const RegisterProjectForm = function () {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const validationSchema = Yup.object({
        projectName: Yup.string()
          .min(2, 'El nombre debe tener mas de 2 caracteres')
          .max(30, 'El nombre debe tener 30 caracteres o menos')
          .required('El nombre del proyecto es obligatorio'),
        description: Yup.string()
          .min(40, 'Tu descripción debe tener mínimo 40 caracteres')
          .max(430, 'Tu descripción debe tener máximo 430 caracteres')
          .required('description es obligatorio'),
        picture: Yup.string()
          .required('Imagen es obligatorio'),
        company: Yup.string()
          .max(20, 'Nombre de empresa es muy largo')
          .required('Este campo es obligatorio'),
        topic: Yup.string()
          .required('Este campo es obligatorio'),
        goalAmount: Yup.number()
          .required('Este campo es obligatorio'),
        deadlineTime: Yup.number()
          .required('Este campo es obligatorio'),
      });

    return (
        <div className='form'>
        <Formik
          initialValues={{
            projectName: '',
            description: '',
            picture: '',
            company: '',
            topic: '',
            goalAmount: '',
            deadlineTime: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
              setLoading(true);
              const requestOptions = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(values),
              };
              try {
                  const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/new`, requestOptions); // OJO AQUI FALTA SETEAR ESTO
                  if (!response.ok) {
                      const error = await response.text();
                      throw new Error(error);
                  }
                  setMessage('Postulacion creada correctamente');
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
                        <label className="label-content-register-project" htmlFor="projectName">Nombre del proyecto: </label>
                        <Field className="center-info-register-project" name="projectName" type="text" placeholder="Nombre proyecto" />
                        {errors.projectName && touched.projectName && (
                          <div className="error">{errors.projectName}</div>
                        )}
                    </div>

                    <div className="label-form-register-project">
                        <label className="label-content-register-project" htmlFor="description">Descripción: </label>
                        <Field className="center-info-register-project" name="description" type="text" placeholder="Descripción" />
                        {errors.description && touched.description && (
                          <div className="error">{errors.description}</div>
                        )}
                    </div>

                    <div className="label-form-register-project">
                        <label className="label-content-register-project" htmlFor="picture">Imagen: </label>
                        <Field className="center-info-register-project" name="picture" type="text" placeholder="URL de la imagen" />
                        {errors.picture && touched.picture && (
                          <div className="error">{errors.picture}</div>
                        )}
                    </div>

                    <div className="label-form-register-project">
                        <label className="label-content-register-project" htmlFor="company">Empresa: </label>
                        <Field className="center-info-register-project" name="company" type="text" placeholder="Empresa u organización" />
                        {errors.company && touched.company && (
                          <div className="error">{errors.company}</div>
                        )}
                    </div>

                    <div className="label-form-register-project">
                        <label className="label-content-register-project" htmlFor="topic">Rubro: </label>
                        <Field className="center-info-register-project" name="topic" type="text" placeholder="Rubro" />
                        {errors.topic && touched.topic && (
                          <div className="error">{errors.topic}</div>
                        )}
                    </div>

                    <div className="label-form-register-project">
                        <label className="label-content-register-project" htmlFor="goalAmount">Meta monetaria: </label>
                        <Field className="center-info-register-project" name="goalAmount" type="number" placeholder="Millones de pesos" />
                        {errors.goalAmount && touched.goalAmount && (
                          <div className="error">{errors.goalAmount}</div>
                        )}
                    </div>

                    <div className="label-form-register-project">
                        <label className="label-content-register-project" htmlFor="deadlineTime">Tiempo límite: </label>
                        <Field className="center-info-register-project" name="deadlineTime" type="number" placeholder="Cantidad de días desde hoy" />
                        {errors.deadlineTime && touched.deadlineTime && (
                          <div className="error">{errors.deadlineTime}</div>
                        )}
                    </div>
                    {!loading ? (
                      <div className="label-form-register-project">
                        <div className="button-submit-register-project">
                          <Button variant="primary" type="submit">Enviar postulación</Button>
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
};

export default RegisterProjectForm;
