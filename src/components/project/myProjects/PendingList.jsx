import React from 'react';
import ProjectList from '../projectList/ProjectList';
import './Projects.css';

function PendingList({ projects }) {
  if (projects.length == 0) {
    return (
      <>
        <u className="title-projects width-80">
          Pendientes
        </u>
        <div className="message-not-projects width-80">
          <ul>
            <li>No hay proyectos en este estado.</li>
          </ul>
        </div>
      </>
    );
  }

  return (
    <>
      <u className="title-projects width-80">
        Pendientes
      </u>
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

export default PendingList;
