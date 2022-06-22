function stringDateOfTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dd = String(tomorrow.getDate()).padStart(2, '0');
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const yyyy = tomorrow.getFullYear();
  const stringTomorrow = `${yyyy}-${mm}-${dd}`;
  return stringTomorrow;
}

export default stringDateOfTomorrow;
