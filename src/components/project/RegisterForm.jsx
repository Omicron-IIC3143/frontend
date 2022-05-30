import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const RegisterForm = function () {
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
                  const response = await fetch(`localhost:8080/projects/new`, requestOptions); // OJO AQUI FALTA SETEAR ESTO
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
              <form>
                  <div>
                      <label htmlFor="projectName">Project Name: </label>
                      <Field name="projectName" type="text" placeholder="Nombre proyecto" />
                      {errors.projectName && touched.projectName && (
                        <div className="error">{errors.projectName}</div>
                      )}
                  </div>

                  <div>
                      <label htmlFor="description">Descripción: </label>
                      <Field name="description" type="text" placeholder="Descripción" />
                      {errors.description && touched.description && (
                        <div className="error">{errors.description}</div>
                      )}
                  </div>

                  <div>
                      <label htmlFor="picture">Imagen: </label>
                      <Field name="picture" type="text" placeholder="URL de la imagen" />
                      {errors.picture && touched.picture && (
                        <div className="error">{errors.picture}</div>
                      )}
                  </div>

                  <div>
                      <label htmlFor="company">Empresa: </label>
                      <Field name="company" type="text" placeholder="Empresa u organización" />
                      {errors.company && touched.company && (
                        <div className="error">{errors.company}</div>
                      )}
                  </div>

                  <div>
                      <label htmlFor="topic">Rubro: </label>
                      <Field name="topic" type="text" placeholder="Rubro" />
                      {errors.topic && touched.topic && (
                        <div className="error">{errors.topic}</div>
                      )}
                  </div>

                  <div>
                      <label htmlFor="goalAmount">Meta monetaria: </label>
                      <Field name="goalAmount" type="number" placeholder="Millones de pesos" />
                      {errors.goalAmount && touched.goalAmount && (
                        <div className="error">{errors.goalAmount}</div>
                      )}
                  </div>

                  <div>
                      <label htmlFor="deadlineTime">Tiempo límite: </label>
                      <Field name="deadlineTime" type="number" placeholder="Cantidad de días desde hoy" />
                      {errors.deadlineTime && touched.deadlineTime && (
                        <div className="error">{errors.deadlineTime}</div>
                      )}
                  </div>
                  {!loading ? (
                    <div>
                      <button type="submit">Enviar postulación</button>
                    </div>
                  ) : (
                    <div>
                      <p>Loading...</p>
                    </div>
                  )}
              </form>
          )}
        </Formik>
        <p>{message}</p>
        </div>
    );
};

export default RegisterForm;
