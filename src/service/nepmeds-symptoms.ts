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
  if (symptomInfo.id) {
    const response = await HttpClient.put<NepMedsResponse>(
      api.symptom + symptomInfo.id + "/",
      {
        name: symptomInfo.name,
        keyword: symptomInfo.keyword,
      }
    );
    return response;
  } else {
    const response = await HttpClient.post<NepMedsResponse>(
      api.symptom,
      symptomInfo
    );
    return response;
  }
};

export const useSaveSymptoms = () => {
  const queryClient = useQueryClient();

  return useMutation(saveSymptoms, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.symptom);
    },
  });
};

const deleteSymptom = async (symptomInfo: { id: string | null }) => {
  const response = await HttpClient.delete<NepMedsResponse>(
    api.symptom + symptomInfo.id + "/"
  );
  return response;
};

export const useDeleteSymptom = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteSymptom, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.symptom);
    },
  });
};

const deleteBulkSymptoms = async (symptomInfo: { id: number[] }) => {
  const payload = { id: symptomInfo.id };
  const response = await HttpClient.delete<NepMedsResponse>(api.symptom, {
    data: payload,
  });
  return response;
};

export const useDeleteBulkSymptoms = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteBulkSymptoms, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.symptom);
    },
  });
};
