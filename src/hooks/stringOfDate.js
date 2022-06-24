function stringOfDate(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  const stringToday = `${dd}-${mm}-${yyyy}`;
  return stringToday;
}

export default stringOfDate;
