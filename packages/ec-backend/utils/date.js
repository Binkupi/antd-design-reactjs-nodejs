exports.getISODateBeforeNowByDays = (days) => {
  const result = new Date();
  result.setDate(result.getDate() - days);
  return result.toISOString();
};
