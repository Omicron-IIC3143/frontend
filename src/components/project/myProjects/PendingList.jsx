import React from 'react';
import ProjectList from '../projectList/ProjectList';
import './Projects.css';

function PendingList({ projects }) {
  if (projects.length == 0) {
    return (
      <>
        <h4 className="titleProjects">Pendientes</h4>
        <div className="width-80">
          <p>No tienes ningún proyecto en estado pendiente.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="titleProjects">Pendientes</div>
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
