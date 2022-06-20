function extractFundedProjects(projects, finances) {
  const projectsId = finances.map((finance) => finance.projectId);
  projects.filter(({ id }) => projectsId.includes(id));

  return projects;
}

export default extractFundedProjects;
