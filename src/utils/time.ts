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
