import React from 'react';
import './FullDescriptionOfProject.css';

function ProjectDescription({ description }) {
  return (
    <div className="descriptionOfProject">
      {/* style="width:100%" */}
      <h3>{description}</h3>
    </div>
  );
}

export default ProjectDescription;
