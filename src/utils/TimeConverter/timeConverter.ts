export const formatDateToString = (time: Date) => {
  return time.toISOString().slice(0, 10);
};
