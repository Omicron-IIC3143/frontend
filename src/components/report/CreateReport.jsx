/* eslint-disable no-alert */
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
// import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import useAuth from '../../hooks/useAuth';
import './CreateReport.css';

/*
Para ayudarse con alguna modificación del Select
Source: https://gist.github.com/hubgit/e394e9be07d95cd5e774989178139ae8?permalink_comment_id=3487405#gistcomment-3487405
*/
// , userId, projectName
function CreateReport({ id }) {
  // const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState('');

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(6, 'El título debe tener 6 o más caracteres.')
      .max(100, 'El título debe tener 100 caracteres o menos.')
      .required('El título del proyecto es obligatorio.'),
    description: Yup.string()
      .min(200, 'Tu descripción debe tener mínimo 200 caracteres.')
      .max(900, 'Tu descripción debe tener máximo 900 caracteres.')
      .required('La descripción es obligatoria.'),
    pictureUrl: Yup.string()
      .required('EL campo de imagen del reporte es obligatorio.'),
  });

  return (
    <>
      <h4 className="title-creation-report">Crea un reporte</h4>
      <div className="form center-content-x width-100">
        <Formik
          enableReinitialize
          initialValues={{
            title: '',
            description: '',
            pictureUrl: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const newValues = {
              ...values,
              projectId: id,
            };
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
              const response = await fetch(`${process.env.REACT_APP_API_URL}/reports/new`, requestOptions); // OJO AQUI FALTA SETEAR ESTO
              if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
              }
              setMessage('Reporte creado correctamente.');
              alert('Reporte creado correctamente.');
              // navigate(`/projects/${id}/reports`, { state: { projectName, userId } });
              window.location.reload();
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
              handleSubmit,
            } = kwargs;
            return (
              <div className="card-report-form width-80 margin-bottom-m">
                <Form onSubmit={handleSubmit}>
                  <div className="label-form-report">
                    <label className="label-content-report" htmlFor="title">Título del reporte: </label>
                    <Field className="center-info-report" name="title" type="text" placeholder="Título del reporte" />
                    {errors.title && touched.title && (
                    <div className="validation-error-report">{errors.title}</div>
                    )}
                  </div>

                  <div className="label-form-report">
                    <label className="label-content-report-description" htmlFor="description">Descripción: </label>
                    <Field className="center-info-report-description" as="textarea" name="description" type="text" placeholder="Describe tu reporte" />
                    {errors.description && touched.description && (
                    <div className="validation-error-report">{errors.description}</div>
                    )}
                  </div>

                  <div className="label-form-report">
                    <label className="label-content-report" htmlFor="pictureUrl">Imagen: </label>
                    <Field className="center-info-report" name="pictureUrl" type="url" placeholder="URL de imagen asociada al reporte" />
                    {errors.pictureUrl && touched.pictureUrl && (
                    <div className="validation-error-report">{errors.pictureUrl}</div>
                    )}
                  </div>

                  {!loading ? (
                    <div className="label-form-report button-submit-report page-buttons margin-bottom-s">
                      <Button variant="primary" type="submit">Publicar reporte</Button>
                    </div>
                  ) : (
                    <div>
                      <p className="final-message-form-report">Publicando reporte...</p>
                    </div>
                  )}
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

export default CreateReport;
