import { useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

export interface Specialization {
  id: number;
  symptom: Symptom[];
  name: string;
  consultation_fees: number;
}

export interface Symptom {
  id: number;
  name: string;
  keyword: string;
  file?: string;
}
const getSpecializationData = async () => {
  const response = await HttpClient.get<NepMedsResponse<Specialization[]>>(
    api.specialization
  );
  return response;
};

export const useSpecializationData = () =>
  useQuery("specialization", getSpecializationData, {
    select: res =>
      res.data.data.map(s => ({
        label: s.name,
        value: s.id,
      })),
  });
