/* eslint-disable no-console */
import React from 'react';
import Select from 'react-select';
import { Formik, Form } from 'formik';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
// import { Input } from 'antd';
import './Searcher.css';
import options from '../../registerProject/SelectOptions';

// const { Search } = Input;

function Searcher(data) {
  const { projects, setFilterData, className } = data;

  const validationSchema = Yup.object({
    tags: Yup.array()
      .min(0, 'Debes seleccionar al menos un tag'),
  });

  const onSearch = (queryTags) => {
    console.log(queryTags);
    const allTags = queryTags.tags.map((tag) => tag.value);
    console.log(allTags);
    if (allTags.length == 0) {
      setFilterData(projects);
    } else {
      const filter = projects.filter((project) => {
        const boolean = allTags.map((tag) => {
          if (project.tags.includes(tag.toLowerCase())) {
            return true;
          }
          return false;
        });
        if (boolean.includes(true)) {
          return true;
        }
        return false;
      });
      setFilterData(filter);
    }
  };

  return (

    <Formik
      initialValues={{
        tags: [],
      }}
      validationSchema={validationSchema}
      onSubmit={onSearch}
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

          <Form className={className} onSubmit={handleSubmit}>
            <div className="label-form-register-project">
              <label className="label-content-searcher" htmlFor="tags">Filtra por tag: </label>
              <Select
                isMulti
                id="tags"
                name="tags"
                className="font-size-2 blue-boarders"
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
              <Button variant="primary" className="button-search" type="submit">Filtrar</Button>
            </div>
          </Form>

        );
      }}
    </Formik>

  );
}

export default Searcher;
