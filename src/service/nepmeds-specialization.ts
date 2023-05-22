import { useMutation, useQuery, useQueryClient } from "react-query";
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
  useQuery(api.specialization, getSpecializationData, {
    select: res => res.data.data,
  });

const saveSpecialization = async (specializationInfo: {
  id: string | null;
  name: string;
  symptom: string;
}) => {
  const response = await HttpClient.post<NepMedsResponse>(
    api.specialization,
    specializationInfo
  );
  return response;
};

export const useSaveSpecialization = () => {
  const queryClient = useQueryClient();

  return useMutation(saveSpecialization, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.specialization);
    },
  });
};
