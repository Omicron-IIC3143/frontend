import React from 'react';
import './Deadline.css';
import stringOfDate from '../../../../hooks/stringOfDate';
import numberOfDays from '../../../../hooks/numberOfDays';

function Deadline({ date, className }) {
  const deadlineDate = new Date(date);
  const numberOfDaysDeadlineDate = numberOfDays(date);
  if (numberOfDaysDeadlineDate > 1) {
    return (
      <div className={`descriptionCard ${className}`}>
        {/* style="width:100%" */}
        <h5>
          Al proyecto le quedan
          {` ${numberOfDaysDeadlineDate} días de financiamiento.`}
        </h5>
        <h5>
          [Fecha de término de financiamiento:
          {` ${stringOfDate(deadlineDate)} a las 20:00]`}
        </h5>
      </div>
    );
  } if (numberOfDaysDeadlineDate > 0) {
    return (
      <div className={`descriptionCard ${className}`}>
        {/* style="width:100%" */}
        <h5>
          Al proyecto le queda menos de
          {` ${numberOfDaysDeadlineDate} día de financiamiento.`}
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
