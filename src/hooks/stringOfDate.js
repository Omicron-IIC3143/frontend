function stringOfDate(date) {
  const dateInFormat = new Date(date);
  const dd = String(dateInFormat.getDate()).padStart(2, '0');
  const mm = String(dateInFormat.getMonth() + 1).padStart(2, '0');
  const yyyy = dateInFormat.getFullYear();
  const stringToday = `${dd}-${mm}-${yyyy}`;
  return stringToday;
}

export default stringOfDate;
