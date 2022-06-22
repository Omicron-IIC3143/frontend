import React from 'react';
import './ProjectImage.css';

function ProjectImage({ company, image }) {
  return (
    <div className="cardImage bg-dark-color">
      {/* style="width:100%" */}
      <img src={image} alt="alternative" width="100%" height="100px" />
      <div className="containerImage bg-dark-color">
        <h1>{company}</h1>
      </div>
    </div>
  );
}

export default ProjectImage;
