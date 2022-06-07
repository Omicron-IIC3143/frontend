import React from 'react';
import ReactLoading from 'react-loading';
import './Loading.css';

function Loading() {
  return (
    <div className="rows-loading">
      <div className="one-row">
        <div className="container-loading">
          <ReactLoading type="cubes" color="lightblue" height="150px" width="150px" />
        </div>
        <div className="container-loading2">
          <ReactLoading type="bars" color="lightblue" height="150px" width="150px" />
        </div>
        <div className="container-loading3">
          <ReactLoading type="cubes" color="lightblue" height="150px" width="150px" />
        </div>
      </div>
      <div className="one-row">
        <div className="container-loading">
          <ReactLoading type="bars" color="lightblue" height="150px" width="150px" />
        </div>
        <div className="container-loading2">
          <ReactLoading type="cubes" color="lightblue" height="150px" width="150px" />
        </div>
        <div className="container-loading3">
          <ReactLoading type="bars" color="lightblue" height="150px" width="150px" />
        </div>
      </div>
      <div className="one-row">
        <div className="container-loading">
          <ReactLoading type="cubes" color="lightblue" height="150px" width="150px" />
        </div>
        <div className="container-loading2">
          <ReactLoading type="bars" color="lightblue" height="150px" width="150px" />
        </div>
        <div className="container-loading3">
          <ReactLoading type="cubes" color="lightblue" height="150px" width="150px" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
