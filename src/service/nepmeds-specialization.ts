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
  consultation_fees: string;
}) => {
  if (specializationInfo.id) {
    const response = await HttpClient.put<NepMedsResponse>(
      api.symptom + "/" + specializationInfo.id,
      {
        name: specializationInfo.name,
        symptom: specializationInfo.symptom,
        consultation_fees: specializationInfo.consultation_fees,
      }
    );
    return response;
  } else {
    const response = await HttpClient.post<NepMedsResponse>(
      api.specialization,
      specializationInfo
    );
    return response;
  }
};

export const useSaveSpecialization = () => {
  const queryClient = useQueryClient();

  return useMutation(saveSpecialization, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.specialization);
    },
  });
};

const deleteSpecialization = async (specializationInfo: {
  id: string | null;
}) => {
  const response = await HttpClient.delete<NepMedsResponse>(
    api.specialization + "/" + specializationInfo.id
  );
  return response;
};

export const useDeleteSpecialization = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteSpecialization, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.specialization);
    },
  });
};
