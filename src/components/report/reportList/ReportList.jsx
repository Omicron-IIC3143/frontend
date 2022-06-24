/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
import React from 'react';
import { Accordion } from 'react-bootstrap';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import '../../user/usersList/UsersList.css';
import DeleteReport from '../../buttons/buttonBack/deleteReport/DeleteReport';
import stringOfDate from '../../../hooks/stringOfDate';
// import { NavLink } from 'react-router-dom';
// import { ButtonUpdatingUser } from '../buttons/updateButton/UpdateButton';
// import { ButtonLookFinancesUser } from '../buttons/financeButton/financeButton';
// import { ButtonPostulatedProjectsUser } from '../buttons/postulatedProjects/PostulatedProjects';
// import { ButtonFinancedProjectsUser } from '../buttons/financedProjects/FinancedProjects';

function ReportsList({ reports, className, auth }) {
  if (reports.length === 0) {
    return (
      <h1>Aún no hay reportes de este proyecto.</h1>
    );
  }
  return (
    <Accordion alwaysOpen className={className}>
      { reports.map((report, index) => (
        <AccordionItem eventKey={index}>
          <AccordionHeader className="header-accordion-user">{`${report.title}`}</AccordionHeader>
          <AccordionBody className="accordion-body body-accordion-user">
            <ul className="accordion-body-list">
              <li className="accordion-body-list-rows">
                Fecha:
                {' '}
                {stringOfDate(report.createdAt)}
              </li>
              <li className="accordion-body-list-rows">
                Contenido:
                {' '}
                {report.description}
              </li>
              <br />
              {auth ? (
                <div className="display-flex-row">
                  <DeleteReport report={report} />
                </div>
              ) : (<></>)}
            </ul>
          </AccordionBody>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default ReportsList;
