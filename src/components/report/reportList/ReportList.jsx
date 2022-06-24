/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
import React from 'react';
import { Accordion } from 'react-bootstrap';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import '../../user/usersList/UsersList.css';
// import { NavLink } from 'react-router-dom';
// import { ButtonUpdatingUser } from '../buttons/updateButton/UpdateButton';
// import { ButtonLookFinancesUser } from '../buttons/financeButton/financeButton';
// import { ButtonPostulatedProjectsUser } from '../buttons/postulatedProjects/PostulatedProjects';
// import { ButtonFinancedProjectsUser } from '../buttons/financedProjects/FinancedProjects';

function ReportsList({ reports, className }) {
  return (
    <Accordion alwaysOpen className={className}>
      { reports.map((report, index) => (
        <AccordionItem eventKey={index}>
          <AccordionHeader className="header-accordion-user">{`${report.title}`}</AccordionHeader>
          <AccordionBody className="accordion-body body-accordion-user">
            <ul className="accordion-body-list">
              <li className="accordion-body-list-rows">
                Contenido:
                {' '}
                {report.description}
              </li>
              <br />
              {/* <div className="display-flex-row">
                <ButtonUpdatingUser id={user.id} />
                <ButtonLookFinancesUser id={user.id} />
                <ButtonPostulatedProjectsUser id={user.id} />
                <ButtonFinancedProjectsUser id={user.id} />
              </div> */}
            </ul>
          </AccordionBody>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default ReportsList;
