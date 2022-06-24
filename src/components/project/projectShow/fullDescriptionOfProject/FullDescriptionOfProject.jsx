import React from 'react';
import './FullDescriptionOfProject.css';

function ProjectDescription({ description, className }) {
  return (
    <div className={`descriptionOfProject ${className}`}>
      {/* style="width:100%" */}
      <h3>{description}</h3>
    </div>
  );
}

export default ProjectDescription;
