import { calculateAge } from "@nepMeds/helper/checkTimeRange";

export const formatSecondsToMinuteAndSeconds = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const formatTimeToMeridian = (time: string) => {
  let meridian = "AM";
  let [hours, mins] = time.split(":").map(t => Number(t));

  if (mins >= 60) {
    hours++;
    mins = 0;
  }

  if (hours > 12) {
    hours = hours % 12;
    meridian = "PM";
  }
  if (hours === 12) meridian = "PM";

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(
    2,
    "0"
  )} ${meridian}`;
};

// Check if user is 18 years old or above
export const validateDateOfBirth = (dateOfBirth: string) => {
  const currentDateObj = new Date();
  const currentDate = currentDateObj.toISOString().split("T")[0]; // Get the current date in ISO format (YYYY-MM-DD)
  if (dateOfBirth > currentDate) {
    return "Date of birth cannot be greater than the current date.";
  }

  if (calculateAge(new Date(dateOfBirth)) < 18) {
    return "You must be at least 18 years old to register.";
  }
  return true; // Return true if the validation passes
};
