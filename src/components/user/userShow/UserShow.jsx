import React from 'react';
import './UserShow.css';
import image from '../../navbar/user_image.jpeg';

export function UserShow({
  name, rut, description, email, editorIsOtherUser, pictureURL, isAdmin,
}) {
  return (
    <div className="card-profile">
      <h3 className="title-show-user">
        {name}
      </h3>
      { isAdmin ? (
        <h3 className="first-sub-title-show-user">
          [Admin]
        </h3>
      ) : (
        <> </>
      )}
      <h3 className="second-sub-title-show-user">
        { editorIsOtherUser ? (
          '[Perfil de otro usuario]'
        ) : (
          '[Mi perfil]'
        )}
      </h3>

      <img className="center-info-picture" src={pictureURL || (image)} alt="user profile" width="150" />

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
