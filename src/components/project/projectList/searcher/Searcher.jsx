/* eslint-disable no-console */
import React from 'react';
import { Input } from 'antd';
import './Searcher.css';

const { Search } = Input;



function Searcher(data) {
  const { projects, filterData, setFilterData } = data;
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
    console.log(filterData);
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
