function extractFundedProjects(projects, finances) {
  console.log(finances);
  if (finances.length === 0) {
    return []
  }
  const projectsId = finances.map((finance) => finance.projectId);
  const projectsFilter = projects.filter(({ id }) => projectsId.includes(id));
  
  return projectsFilter;
}

export default extractFundedProjects;
