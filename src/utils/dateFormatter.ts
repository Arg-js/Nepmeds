import { removeSeconds } from "@nepMeds/helper/checkTimeRange";

// eg:
// date: '2023-10-03', from_time: '12:30:00', to_time: '12:45:00'
// 9:00 PM, November 8 2022, Wednesday (After 2 days)
export const dateFormatter = ({
  date,
  time,
}: {
  date: string;
  time: string;
}) => {
  const inputDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  return `${removeSeconds(time)} ${inputDate.toLocaleDateString(
    "en-US",
    options
  )}`;
};
