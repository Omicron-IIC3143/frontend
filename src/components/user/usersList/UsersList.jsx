/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
import React from 'react';
import { Accordion } from 'react-bootstrap';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import './UsersList.css';
import { NavLink } from 'react-router-dom';
import { ButtonUpdatingUser } from '../buttons/updateButton/UpdateButton';
import { ButtonLookFinancesUser } from '../buttons/financeButton/financeButton';
import { ButtonPostulatedProjectsUser } from '../buttons/postulatedProjects/PostulatedProjects';
import { ButtonFinancedProjectsUser } from '../buttons/financedProjects/FinancedProjects';

function UsersList({ users, className }) {
  const filteredUsers = users.filter((user) => !(user.email == 'deleted@uc.cl')).sort((a, b) => a.id - b.id);
  return (
    <Accordion alwaysOpen className={className}>
      { filteredUsers.map((user, index) => (
        <AccordionItem eventKey={index}>
          <AccordionHeader className="header-accordion-user">{`${user.name} (${user.email})`}</AccordionHeader>
          <AccordionBody className="accordion-body body-accordion-user">
            <ul className="accordion-body-list">
              <NavLink exact to={`/users/${user.id}`} activeClassName="activeClicked">
                Ver perfil del usuario
              </NavLink>
              <li className="accordion-body-list-rows">
                ID usuario:
                {' '}
                {user.id}
              </li>
              <li className="accordion-body-list-rows">
                RUT:
                {' '}
                {user.rut}
              </li>
              <li className="accordion-body-list-rows">
                Descripción:
                {' '}
                {user.description}
              </li>
              <li className="accordion-body-list-rows">
                Administrador(a):
                {' '}
                {user.isAdmin == true ? (
                  <>
                    Sí
                  </>
                ) : (
                  <>
                    No
                  </>
                )}
              </li>
              <br />
              <div className="display-flex-row">
                <ButtonUpdatingUser id={user.id} />
                <ButtonLookFinancesUser id={user.id} />
                <ButtonPostulatedProjectsUser id={user.id} />
                <ButtonFinancedProjectsUser id={user.id} />
              </div>
            </ul>
          </AccordionBody>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default UsersList;
