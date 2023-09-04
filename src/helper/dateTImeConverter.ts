import { format, isValid } from "date-fns";

// Converts date (2023-07-29) to the format --> 29th July
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
////

// Get day of week from date
export function formatToDayOfWeek(inputDateStr: string): string {
  const inputDate = new Date(inputDateStr);
  const dayOfWeek = inputDate.toLocaleDateString("en-US", { weekday: "long" });

  return dayOfWeek;
}
//

export function formatToMonth(inputDateStr: string): string {
  const inputDate = new Date(inputDateStr);
  const month = inputDate.toLocaleDateString("en-US", { month: "long" });
  return month;
}

export function formatToDate(inputDateStr: string): number {
  const inputDate = new Date(inputDateStr);
  const date = inputDate.getDate();
  return date;
}

//Take input as 2023-07-29T15:30:22.067881+05:45 and returns 2023-07-29
export function getFullDate(inputDateStr: string): string {
  const date = new Date(inputDateStr);

  if (!isValid(date)) {
    return "";
  } else {
    const fullDate = format(date, "yyyy-MM-dd");
    return fullDate; // Output: '2023-08-28'
  }
}
