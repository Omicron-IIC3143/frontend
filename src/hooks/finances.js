function extractFundedProjects(projects, finances) {
  const projectsId = finances.map((finance) => finance.projectId);
  const projectsFilter = projects.filter(({ id }) => projectsId.includes(id));

  return projectsFilter;
}

export default extractFundedProjects;
