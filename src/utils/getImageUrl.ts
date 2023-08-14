import { normalURL } from "@nepMeds/service/service-axios";

export const getImageUrl = (filePath: string) =>
  `${normalURL}/media/${filePath}`;

// Accepts with '/' in the beginning e.g. '/media/doctor_profile/doctor_profile_1.jpg'
export const appendServerUrl = (filePath: string) => `${normalURL}${filePath}`;
