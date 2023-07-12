import { normalURL } from "@nepMeds/service/service-axios";

export const getImageUrl = (filePath: string) =>
  `${normalURL}/media/${filePath}`;
