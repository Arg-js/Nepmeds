import { differenceInMinutes, differenceInYears, parse } from "date-fns";

export function isTimeInRange(
  start: string,
  end: string,
  target: string
): boolean {
  const startTime = getTimeInMinutes(start);
  const endTime = getTimeInMinutes(end);
  const targetTime = getTimeInMinutes(target);

  return startTime <= targetTime && targetTime <= endTime;
}

export function getTimeInMinutes(time: string): number {
  const [hours, minutes] = time ? time.split(":").map(Number) : [0, 0];

  return hours * 60 + minutes;
}

export function getMinutes(time: string): number {
  const [, minutes] = time.split(":").map(Number);
  return minutes;
}

export function getHour(time: string): number {
  const [hour] = time.split(":").map(Number);
  return hour;
}

export function removeMinutes(timeString: string): string {
  const [hours, _] = timeString.split(":");
  return `${hours}:00`;
}

export function getMinutesDifference(
  startTime: string,
  endTime: string
): number {
  const start = new Date();
  const end = new Date();

  const [startHour, startMinute] = startTime.split(":");
  const [endHour, endMinute] = endTime.split(":");

  start.setHours(Number(startHour), Number(startMinute), 0);
  end.setHours(Number(endHour), Number(endMinute), 0);

  const differenceInMilliseconds = end.getTime() - start.getTime();
  const minutesDifference = Math.floor(differenceInMilliseconds / (1000 * 60));

  return minutesDifference;
}

export function splitTimeRange(startTime: string, endTime: string) {
  const start = new Date("1970-01-01 " + startTime);
  const end = new Date("1970-01-01 " + endTime);

  const intervals = [];
  let current = start;

  while (current < end) {
    const nextHour = new Date(current);
    nextHour.setHours(current.getHours() + 1, 0, 0, 0);

    if (nextHour > end) {
      intervals.push([formatTime(current), formatTime(end)]);
    } else {
      intervals.push([formatTime(current), formatTime(nextHour)]);
    }

    current = nextHour;
  }

  return intervals;
}

function formatTime(date: Date) {
  return date.toTimeString().slice(0, 5);
}

export function findTimeRange(
  inputTime: string,
  timeRanges: Array<Array<string>>
) {
  const inputDateTime = new Date("1970-01-01 " + inputTime);

  for (const [startTime, endTime] of timeRanges) {
    const start = new Date("1970-01-01 " + startTime);
    const end = new Date("1970-01-01 " + endTime);

    if (inputDateTime >= start && inputDateTime < end) {
      return [startTime, endTime];
    }
  }
}

export function addOneHour(timeString: string): string {
  const [hours, minutes] = timeString.split(":");

  // Create a new Date object with the input time
  const time = new Date();
  time.setHours(parseInt(hours, 10), parseInt(minutes, 10));

  // Add one hour to the time
  time.setHours(time.getHours() + 1);

  // Get the updated hours and minutes
  const updatedHours = time.getHours();
  const updatedMinutes = time.getMinutes();

  return `${updatedHours}:${updatedMinutes.toString().padStart(2, "0")}:00`;
}

export function timeStringToMinutes(timeString: string) {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

export function calculateTimeDifferenceInMinutes(time1: string, time2: string) {
  const minutes1 = timeStringToMinutes(time1);
  const minutes2 = timeStringToMinutes(time2);
  return Math.abs(minutes2 - minutes1);
}

export function addTimes(time1: string, time2: string) {
  // Split the time strings to extract hours and minutes
  const [hours1, minutes1] = time1.split(":").map(Number);
  const [hours2, minutes2] = time2.split(":").map(Number);

  // Calculate the total seconds for each time
  const totalMinutes1 = hours1 * 3600 + minutes1 * 60;
  const totalMinutes2 = hours2 * 3600 + minutes2 * 60;

  // Calculate the total seconds for the sum
  const totalSumMinutes = totalMinutes1 + totalMinutes2;

  // Calculate the resulting hours and minutes
  const resultHours = Math.floor(totalSumMinutes / 3600);
  const resultMinutes = Math.floor((totalSumMinutes % 3600) / 60);

  // Format the result as "HH:mm:ss"
  const resultTime = `${String(resultHours).padStart(2, "0")}:${String(
    resultMinutes
  ).padStart(2, "0")}`;

  return resultTime;
}

export function addFifteenMinutes(timeString: string): string {
  const [hours, minutes] = timeString.split(":");

  // Create a new Date object with the input time
  const time = new Date();
  time.setHours(parseInt(hours, 10), parseInt(minutes, 10));

  // Add 15 minutes to the time
  time.setMinutes(time.getMinutes() + 15);

  // Get the updated hours and minutes
  const updatedHours = time.getHours();
  const updatedMinutes = time.getMinutes();

  return `${updatedHours}:${updatedMinutes.toString().padStart(2, "0")}:00`;
}

export const calculateAge = (dob: Date): number => {
  const age = differenceInYears(new Date(), dob);
  return age;
};

export const getDayDifference = (date1: Date, date2: Date): number => {
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  return Math.round(diffInMs / (1000 * 60 * 60 * 24));
};

// This function will return the difference in minutes between two time
// which takes time in such format 'HH:mm' e.g. '10:00'
export const getTimeDifferenceInMinutes = (
  fromDate: string,
  toDate: string
) => {
  const toTime = parse(toDate, "HH:mm", new Date());
  const fromTime = parse(fromDate, "HH:mm", new Date());

  return differenceInMinutes(toTime, fromTime);
};
