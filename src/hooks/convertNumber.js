function convertMoneyToString(moneyNumber) {
  if (!moneyNumber && typeof (moneyNumber) != 'number') {
    return '';
  }
  const string = moneyNumber.toLocaleString('es-CL');
  return string;
}

export default convertMoneyToString;
