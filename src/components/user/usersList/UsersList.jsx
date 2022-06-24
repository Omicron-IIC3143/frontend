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
<<<<<<< HEAD:src/components/usersList/UsersList.jsx
import ButtonUpdatingUser from '../user/buttons/updateButton/UpdateButton';
=======
import { ButtonUpdatingUser } from '../buttons/updateButton/UpdateButton';
import { ButtonLookFinancesUser } from '../buttons/financeButton/financeButton';
import { ButtonPostulatedProjectsUser } from '../buttons/postulatedProjects/PostulatedProjects';
import { ButtonFinancedProjectsUser } from '../buttons/financedProjects/FinancedProjects';
>>>>>>> dev:src/components/user/usersList/UsersList.jsx

function UsersList({ users, className }) {
  return (
<<<<<<< HEAD:src/components/usersList/UsersList.jsx
    <Accordion alwaysOpen>
      {users.map((user, index) => (
        <AccordionItem eventKey={index}>
          <AccordionHeader className="header-accordion-user">{`${user.name} (${user.email})`}</AccordionHeader>
          <AccordionBody className="accordion-body body-accordion-user">
            <ul>
              <NavLink
                exact
                to={`/users/${user.id}`}
                activeClassName="activeClicked"
              >
                Ver perfil del usuario
              </NavLink>
              <li>
                User ID:
=======
    <Accordion alwaysOpen className={className}>
      { users.map((user, index) => (
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
>>>>>>> dev:src/components/user/usersList/UsersList.jsx
                {user.id}
              </li>
              <li className="accordion-body-list-rows">
                RUT:
                {user.rut}
              </li>
              <li className="accordion-body-list-rows">
                Descripción:
                {user.description}
              </li>
<<<<<<< HEAD:src/components/usersList/UsersList.jsx
              <li>
                Admin:
                {String(user.isAdmin)}
=======
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
>>>>>>> dev:src/components/user/usersList/UsersList.jsx
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
