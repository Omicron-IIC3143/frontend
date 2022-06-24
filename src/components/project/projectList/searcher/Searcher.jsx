/* eslint-disable no-console */
import React from 'react';
import { Input } from 'antd';
import './Searcher.css';

const { Search } = Input;

function Searcher(data) {
  const { projects, filterData, setFilterData } = data;
<<<<<<< HEAD
  // console.log(filterData);
  // console.log(projects);
=======

  // const filtro = (dataProject, valor) => {
  //   console.log(dataProject);
  //   const lower = dataProject.map(({ tags }) => tags.map((tag) => tag.toLowerCase));
  //   console.log(lower);
  //   const filtrado = lower.filter(({ tags }) => tags.includes(valor.toLowerCase()));
  //   console.log(filtrado);
  //   return filtrado;
  // };

  // projects.filter(({ tags }) => tags.toLowerCase().includes(value.toLowerCase())

>>>>>>> dev
  const onSearch = (value) => {
    // console.log('hola');
    // console.log(value);
    // console.log(filterData);
    if (
      filterData
<<<<<<< HEAD
            // eslint-disable-next-line react/destructuring-assignment
            !== projects.filter(({ tags }) => tags.toLowerCase().includes(value.toLowerCase()))
=======
      // eslint-disable-next-line react/destructuring-assignment
      !== projects.filter(({ tags }) => tags.includes(value.toLowerCase()))
>>>>>>> dev
    ) {
      // eslint-disable-next-line react/destructuring-assignment
      // eslint-disable-next-line max-len
      const filter = projects.filter(({ tags }) => tags.includes(value.toLowerCase()));
      setFilterData(filter);
    }
    if (value == '') {
      setFilterData(projects);
    }
  };
  return (
    <Search
      className="col-stock-sale"
      placeholder="Buscar Proyecto"
      onSearch={onSearch}
      // esto hay q revisar que funcione.
    />
  );
}

export default Searcher;
