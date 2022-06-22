function numberOfDays(date) {
  const today = new Date();
  const deadlineDate = new Date(date);
  const days = Math.floor(((deadlineDate.getTime() - today.getTime()) / 1000) / 86400) + 1;
  return days;
}

export default numberOfDays;
