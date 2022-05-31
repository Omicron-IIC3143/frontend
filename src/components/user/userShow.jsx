import React from 'react';
import './userShow.css';

export function UserShow({
  name, rut, money, description, email,
}) {
  return (
    <div className="card-profile">
      <h3>
        <b>Nombre:</b>
        {name}
      </h3>
      <h3>
        <b>Rut:</b>
        {rut}
      </h3>
      <h3>
        <b>Saldo actual:</b>
        {money}
      </h3>
      <h3>
        <b>Descripción:</b>
        {description}
      </h3>
      <h3>
        <b>Correo electrónico:</b>
        {email}
      </h3>
    </div>
  );
}

export default UserShow;
