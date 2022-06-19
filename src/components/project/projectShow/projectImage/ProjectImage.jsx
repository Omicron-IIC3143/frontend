import React from 'react';
import './ProjectImage.css';

function ProjectImage({ title, image }) {
  return (
    <div className="cardImage">
      {/* style="width:100%" */}
      <img src={image} alt="alternative" width="100%" height="100px" />
      <div className="containerImage">
        <h1>{title}</h1>
      </div>
    </div>
  );
}

export default ProjectImage;
