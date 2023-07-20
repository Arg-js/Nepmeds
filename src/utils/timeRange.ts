export function generateTimeWith15MinutesInterval() {
  const result = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedHour12 = hour === 0 || hour === 12 ? 12 : hour % 12;
      const period = hour < 12 ? "AM" : "PM";
      const formattedHour24 = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      const label = `${formattedHour12}:${formattedMinute} ${period}`;
      const value = `${formattedHour24}:${formattedMinute}`;
      result.push({ label, value });
    }
  }
  return result;
}

function padZero(num: number) {
  return num.toString().padStart(2, "0");
}

// Generate an array of time strings
export function generateHoursTimeArray() {
  const times = [];
  for (let hour = 0; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 60) {
      const timeString = `${padZero(hour)}:${padZero(minute)}`;
      times.push({ time: timeString });
    }
  }
  return times;
}
