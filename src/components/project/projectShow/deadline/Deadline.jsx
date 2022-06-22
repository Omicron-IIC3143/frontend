import React from 'react';
import './Deadline.css';
import stringOfDate from '../../../../hooks/stringOfDate';

function Deadline({ date, className }) {
  const today = new Date();
  const deadlineDate = new Date(date);
  const numberOfDays = Math.floor(((deadlineDate.getTime() - today.getTime()) / 1000) / 86400) + 1;
  if (numberOfDays > 1) {
    return (
      <div className={`descriptionCard ${className}`}>
        {/* style="width:100%" */}
        <h5>
          Al proyecto le quedan alrededor de
          {` ${numberOfDays} días de financiamiento.`}
        </h5>
        <h5>
          [Fecha de término de financiamiento:
          {` ${stringOfDate(deadlineDate)} a las 20:00]`}
        </h5>
      </div>
    );
  } if (numberOfDays > 0) {
    return (
      <div className={`descriptionCard ${className}`}>
        {/* style="width:100%" */}
        <h5>
          Al proyecto le queda menos de
          {` ${numberOfDays} día de financiamiento.`}
        </h5>
        <h5>
          [Fecha de término de financiamiento:
          {` ${stringOfDate(deadlineDate)} a las 20:00]`}
        </h5>
      </div>
    );
  }
  return (
    <div className={`descriptionCard ${className}`}>
      {/* style="width:100%" */}
      <h5>El proyecto ya ha llegado a su tiempo límite de financiamiento.</h5>
      <h5>
        [Fecha de término de financiamiento:
        {` ${stringOfDate(deadlineDate)} a las 20:00]`}
      </h5>
    </div>
  );
}

export default Deadline;
