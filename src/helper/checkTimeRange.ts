import { differenceInMinutes, differenceInYears, parse } from "date-fns";

export function isTimeInRange(
  start: string,
  end: string,
  target: string
): boolean {
  const startTime = getTimeInMinutes(start);
  const endTime = getTimeInMinutes(end);
  const targetTime = getTimeInMinutes(target);

  return startTime <= targetTime && targetTime < endTime;
}

export function getTimeInMinutes(time: string): number {
  const [hours, minutes] = time ? time.split(":").map(Number) : [0, 0];

  return hours * 60 + minutes;
}

export function getMinutes(time: string): number {
  const [, minutes] = time.split(":").map(Number);
  return minutes;
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
