export const totalsHandler = (loanEntries, relevantParameter) => {
  let initialValue = 0;
  return loanEntries.reduce(function (accumulator, currentValue) {
    return accumulator + parseFloat(currentValue[relevantParameter]);
  }, initialValue);
};
