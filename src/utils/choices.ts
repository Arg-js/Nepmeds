export const title = [
  { label: "Dr", value: "Dr" },
  { label: "Md", value: "Md" },
  { label: "Surgeon", value: "Surgeon" },
];

export const gender = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

export const idType = [
  {
    label: "Citizenship",
    value: "Citizenship",
  },
  {
    label: "Passport",
    value: "Passport",
  },
  {
    label: "Driving License",
    value: "Driving License",
  },
];
export const district = [
  { label: "Kathmandu", value: "Kathmandu" },
  { label: "Bhaktapur", value: "Bhaktapur" },
];
export const province = [
  { label: "Province 1", value: "Province 1" },
  { label: "Province 2", value: "Province 2" },
];

export const municipality = [
  { label: "Lalitpur Sub Metro", value: "Lalitpur Sub Metro" },
  { label: "Bhaktapur Municipality", value: "Bhaktapur Municipality" },
];

export const phone = [{ label: " +977", value: "+977" }];

const currentYear = new Date().getFullYear();
export const years = Array.from(
  { length: currentYear - 1950 + 1 },
  (_, index) => {
    const year = currentYear - index;
    return {
      label: year.toString(),
      value: year.toString(),
    };
  }
);

export const AppointmentType = [
  { label: "Follow up", value: "followup" },
  { label: "Appointment", value: "Appointment" },
];

export const FrequencyType = [
  { label: "Everyday", value: "Everyday" },

  { label: "Weekends", value: "Weekends" },
  { label: "Does not Repeat", value: "Weekday" },
  { label: "Repeat Daily", value: "Weekdays" },
];
