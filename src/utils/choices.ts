import { AVAILABILITYFREQUENCY, PRIMARYIDTYPE } from "@nepMeds/config/enum";

export const gender = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

export const idType = [
  {
    label: "Citizenship",
    value: PRIMARYIDTYPE.Citizenship,
  },
  {
    label: "Passport",
    value: PRIMARYIDTYPE.Passport,
  },
  {
    label: "Driving License",
    value: PRIMARYIDTYPE.Driving_License,
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

export const year = [
  { label: "2019", value: "2019" },
  { label: "2020", value: "2020" },
  { label: "2021", value: "2021" },
  { label: "2022", value: "2022" },
];

export const AppointmentType = [
  { label: "Follow up", value: "followup" },
  { label: "Appointment", value: "Appointment" },
];

export const FrequencyType = [
  { label: "Everyday", value: AVAILABILITYFREQUENCY.Everyday },
  { label: "Weekend", value: AVAILABILITYFREQUENCY.Weekends },
  { label: "Does not Repeat", value: AVAILABILITYFREQUENCY.Do_Not_Repeat },
  { label: "Custom", value: AVAILABILITYFREQUENCY.Custom },
];
