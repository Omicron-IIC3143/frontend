import React from 'react';
import ProjectList from '../projectList/ProjectList';
import './Projects.css';

function AcceptedList({ projects }) {
  if (projects.length == 0) {
    return (
      <>
        <h4 className="title">Aceptados</h4>
        <div className="width-80">
          <p>No tienes ningún proyecto en estado aceptado.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <h4 className="title">Aceptados</h4>
      {projects.map((project) => (
        <div className="width-80">
          <ProjectList
            id={project?.id}
            topic={project?.topic}
            title={project?.name}
            description={project?.description}
            date={project?.createdAt}
            company={project?.company}
          />
        </div>
      ))}
    </>
  );
}

export default AcceptedList;
