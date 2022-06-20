/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
import React from 'react';
import { Accordion } from 'react-bootstrap';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import './UsersList.css';

function UsersList({ users }) {
  return (
    <Accordion alwaysOpen>
      { users.map((user, index) => (
        <AccordionItem eventKey={index}>
          <AccordionHeader className="header-accordion-user">{`${user.name} (${user.email})`}</AccordionHeader>
          <AccordionBody className="accordion-body body-accordion-user">
            <ul>
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
            </ul>
          </AccordionBody>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default UsersList;
