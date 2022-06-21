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
import { ButtonUpdatingUser } from '../user/buttons/updateButton/UpdateButton';

function UsersList({ users }) {
  return (
    <Accordion alwaysOpen>
      { users.map((user, index) => (
        <AccordionItem eventKey={index}>
          <AccordionHeader className="header-accordion-user">{`${user.name} (${user.email})`}</AccordionHeader>
          <AccordionBody className="accordion-body body-accordion-user">
            <ul>
              <NavLink exact to={`/users/${user.id}`} activeClassName="activeClicked">
                Ver perfil del usuario
              </NavLink>
              <li>
                User ID:
                {' '}
                {user.id}
              </li>
              <li>
                RUT:
                {' '}
                {user.rut}
              </li>
              <li>
                Descripción:
                {' '}
                {user.description}
              </li>
              <li>
                Admin:
                {' '}
                {String(user.isAdmin)}
              </li>
              <br />
              <ButtonUpdatingUser id={user.id} />
            </ul>
          </AccordionBody>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default UsersList;
