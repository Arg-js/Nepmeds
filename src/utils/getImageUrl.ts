import { normalURL } from "@nepMeds/service/service-axios";

export const getImageUrl = (filePath: string) =>
  `${normalURL.replace("/backend", "")}/media/${filePath}`;

// Accepts with '/' in the beginning e.g. '/media/doctor_profile/doctor_profile_1.jpg'
export const appendServerUrl = (filePath: string) =>
  `${normalURL.replace("/backend", "")}${filePath}`;

// Opens the given link/url in new tab
export const openLinkInNewTab = (url: string) => {
  const newTab = window.open(url, "_blank", "noopener,noreferrer");
  if (newTab) newTab.opener = null;
};
