function extractInfoFinancing(projects, finances) {
  if (finances.length === 0) {
    return [];
  }
  const infoTransaction = finances.map(
    (finance) => [finance.id, finance.projectId, finance.amount, finance.createdAt],
  );
  let counter = 0;
  for (let index = 0; index < infoTransaction.length; index += 1) {
    const projectId = infoTransaction[index][1];
    for (let index2 = 0; index2 < projects.length; index2 += 1) {
      const projectObject = projects[index2];
      if (projectId === projectObject.id) {
        infoTransaction[counter][4] = projectObject.name;
        counter += 1;
      }
    }
  }
  // formato de los elementos de infoTransaction:
  // id de financiamiento, id del proyecto, monto, fecha de transacción, nombre del proyecto
  return infoTransaction;
}

export default extractInfoFinancing;
