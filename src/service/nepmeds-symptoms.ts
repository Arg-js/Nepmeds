import { useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

export interface Symptom {
  id: number;
  name: string;
  keyword: string;
  file?: string;
}
const getSymptoms = async () => {
  const response = await HttpClient.get<NepMedsResponse<Symptom[]>>(
    api.symptom
  );
  return response;
};

export const useGetSymptoms = () =>
  useQuery("specialization", getSymptoms, { select: res => res.data.data });
