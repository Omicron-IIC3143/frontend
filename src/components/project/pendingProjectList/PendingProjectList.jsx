/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
import React from 'react';
import { Accordion } from 'react-bootstrap';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import '../../usersList/UsersList.css';
import { NavLink } from 'react-router-dom';
import stringOfDate from '../../../hooks/stringOfDate';
import convertMoneyToString from '../../../hooks/convertNumber';
import { ButtonAccepted } from './ButtonAccepted';
import { ButtonRejected } from './ButtonRejected';

function PendingProjectList({ projects, className }) {
  console.log(projects);
  return (
    <Accordion alwaysOpen className={className}>
      { projects.map((project, index) => (
        <AccordionItem eventKey={index}>
          <AccordionHeader className="header-accordion-user">{`${project?.name} (${project?.company})`}</AccordionHeader>
          <AccordionBody className="accordion-body body-accordion-user">
            <ul className="accordion-body-list">
              <NavLink exact to={`/projects/${project?.id}`} activeClassName="activeClicked">
                Ver detalles del proyecto
              </NavLink>
              <li className="accordion-body-list-rows">
                ID proyecto:
                {' '}
                {project?.id}
              </li>
              <li className="accordion-body-list-rows">
                Rubro:
                {' '}
                {project?.topic}
              </li>
              <li className="accordion-body-list-rows">
                Fecha de plazo:
                {' '}
                {stringOfDate(project?.date)}
              </li>
              <li className="accordion-body-list-rows">
                Monto meta (CLP):
                {' '}
                {`$ ${convertMoneyToString(project?.goalAmount)}`}
              </li>
              <li className="accordion-body-list-rows">
                <NavLink exact to={`/users/${project?.userId}`} activeClassName="activeClicked">
                  Ver perfil del usuario postulante
                </NavLink>
              </li>
              <br />
              <div className="display-flex-row">
                <ButtonAccepted
                  id={project?.id}
                />
                <ButtonRejected
                  id={project?.id}
                />
              </div>
            </ul>
          </AccordionBody>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default PendingProjectList;
