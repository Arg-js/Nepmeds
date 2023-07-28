export function formatToDateMonth(inputDateStr: string): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const inputDate = new Date(inputDateStr);
  const day = inputDate.getDate();
  const month = months[inputDate.getMonth()];

  const suffix = getDaySuffix(day); // Helper function to get day suffix, like "th", "st", "nd", "rd"

  return `${day}${suffix} ${month}`;
}

// Helper function to get the day suffix (st, nd, rd, or th)
function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatToDayOfWeek(inputDateStr: string): string {
  const inputDate = new Date(inputDateStr);
  const dayOfWeek = inputDate.toLocaleDateString("en-US", { weekday: "long" });

  return dayOfWeek;
}
