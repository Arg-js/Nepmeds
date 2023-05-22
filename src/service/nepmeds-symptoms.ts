import { useMutation, useQuery, useQueryClient } from "react-query";
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
  useQuery(api.symptom, getSymptoms, { select: res => res.data.data });

const saveSymptoms = async (symptomInfo: {
  id: string | null;
  name: string;
  keyword: string;
}) => {
  const response = await HttpClient.post<NepMedsResponse>(
    api.symptom,
    symptomInfo
  );
  return response;
};

export const useSaveSymptoms = () => {
  const queryClient = useQueryClient();

  return useMutation(saveSymptoms, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.symptom);
    },
  });
};
