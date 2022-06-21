import React from 'react';
import './Deadline.css';

function stringOfDate(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  const stringToday = `${dd}-${mm}-${yyyy}`;
  return stringToday;
}

function Deadline({ date, className }) {
  const today = new Date();
  const deadlineDate = new Date(date);
  const numberOfDays = Math.floor(((deadlineDate.getTime() - today.getTime()) / 1000) / 86400);
  if (numberOfDays > 0) {
    return (
      <div className={`descriptionCard ${className}`}>
        {/* style="width:100%" */}
        <h5>
          Al proyecto le quedan
          {` ${numberOfDays} días de financiamiento.`}
        </h5>
        <h5>
          [Fecha de término de financiamiento:
          {` ${stringOfDate(deadlineDate)} a las 23:59]`}
        </h5>
      </div>
    );
  } return (
    <div className={`descriptionCard ${className}`}>
      {/* style="width:100%" */}
      <h5>El proyecto ya ha llegado a su tiempo límite de financiamiento.</h5>
    </div>
  );
}

export default Deadline;
