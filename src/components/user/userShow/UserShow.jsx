import React from 'react';
import './UserShow.css';

export function UserShow({
  name, rut, description, email, boolean,
}) {
  if (boolean == true) {
    return (
      <div className="card-profile">
        <h3 className="title-show-user">
          {name}
        </h3>
        <h3 className="sub-title-show-user">
          [Perfil de otro usuario]
        </h3>
        <h3 className="center-info">
          <b>Rut: </b>
          {rut}
        </h3>
        <h3 className="center-info">
          <b>Descripción: </b>
          {description}
        </h3>
        <h3 className="center-info">
          <b>Correo electrónico: </b>
          {email}
        </h3>
      </div>
    );
  }
  return (
    <div className="card-profile">
      <h3 className="title-show-user">
        {name}
      </h3>
      <h3 className="sub-title-show-user">
        [Mi perfil]
      </h3>
      <h3 className="center-info">
        <b>Rut: </b>
        {rut}
      </h3>
      <h3 className="center-info">
        <b>Descripción: </b>
        {description}
      </h3>
      <h3 className="center-info">
        <b>Correo electrónico: </b>
        {email}
      </h3>
    </div>
  );
}

export default UserShow;
