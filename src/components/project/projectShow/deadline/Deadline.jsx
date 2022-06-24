import React from 'react';
import './Deadline.css';
import stringOfDate from '../../../../hooks/stringOfDate';
import numberOfDays from '../../../../hooks/numberOfDays';

function StringStateProject(englishState) {
  if (englishState == 'pending') {
    return ' Pendiente';
  } if (englishState == 'accepted') {
    return ' Aprobado';
  } if (englishState == 'rejected') {
    return ' Rechazado';
  }
  return '';
}

function Deadline({ date, className, state }) {
  const numberOfDaysDeadlineDate = numberOfDays(date);
  if (numberOfDaysDeadlineDate > 1) {
    return (
      <div className={`descriptionCard ${className}`}>
        {/* style="width:100%" */}
        <h5>
          <ul>
            <li>
              Estado del proyecto:
              {`${StringStateProject(state)}`}
            </li>
            <li>
              Al proyecto le quedan
              {` ${numberOfDaysDeadlineDate} días de financiamiento.`}
            </li>
            <li>
              [Fecha de término de financiamiento:
              {` ${stringOfDate(date)} a las 20:00]`}
            </li>
          </ul>
        </h5>
      </div>
    );
  } if (numberOfDaysDeadlineDate > 0) {
    return (
      <div className={`descriptionCard ${className}`}>
        {/* style="width:100%" */}
        <h5>
          <ul>
            <li>
              Estado del proyecto:
              {`${StringStateProject(state)}`}
            </li>
            <li>
              Al proyecto le queda menos de
              {` ${numberOfDaysDeadlineDate} día de financiamiento.`}
            </li>
            <li>
              [Fecha de término de financiamiento:
              {` ${stringOfDate(date)} a las 20:00]`}
            </li>
          </ul>
        </h5>
      </div>
    );
  }
  return (
    <div className={`descriptionCard ${className}`}>
      {/* style="width:100%" */}
      <h5>
        <ul>
          <li>Estado del proyecto: Terminado</li>
          <li>El proyecto ya ha llegado a su tiempo límite de financiamiento.</li>
          <li>
            [Fecha de término de financiamiento:
            {` ${stringOfDate(date)} a las 20:00]`}
          </li>
        </ul>
      </h5>
    </div>
  );
}

export default Deadline;
