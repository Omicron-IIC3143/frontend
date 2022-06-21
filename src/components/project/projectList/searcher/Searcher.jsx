/* eslint-disable no-console */
import React from 'react';
import {
  Input,
} from 'antd';
import './Searcher.css';

const { Search } = Input;

function Searcher(data) {
  const { projects, filterData, setFilterData } = data;
  console.log(filterData);
  console.log(projects);
  const onSearch = (value) => {
    // console.log('hola');
    // console.log(value);
    // console.log(filterData);
    if (
      filterData
      // eslint-disable-next-line react/destructuring-assignment
      !== projects.filter(({ tags }) => tags.toLowerCase().includes(value.toLowerCase()))
    ) {
      // eslint-disable-next-line react/destructuring-assignment
      // eslint-disable-next-line max-len
      const filter = projects.filter(({ tags }) => tags.toLowerCase().includes(value.toLowerCase()));
      setFilterData(filter);
    }
  };
  return (
    <Search
      className="col-stock-sale"
      placeholder="Buscar Proyecto"
      onSearch={onSearch}
    />
  );
}

export default Searcher;
