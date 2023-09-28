export const formatDateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(date.getDate()).padStart(2, "0");

  // Create the formatted date string 'yyyy-MM-dd'
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
