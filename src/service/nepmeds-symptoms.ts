import { useMutation, useQuery, useQueryClient } from "react-query";
import { Symptom } from "./nepmeds-specialization";
import { NepMedsResponse, PaginatedResponse, api } from "./service-api";
import { HttpClient } from "@nepMeds/service/service-axios";
import { objectToFormData } from "@nepMeds/utils/toFormData";

const getSymptoms = async () => {
  const response = await HttpClient.get<NepMedsResponse<Symptom[]>>(
    api.symptom_list
  );
  return response;
};

export const useGetSymptoms = () =>
  useQuery(api.symptom_list, getSymptoms, { select: res => res.data.data });
export interface ISymptom {
  id: string | null;
  name: string;
  keyword: string;
  description: string;
  image?: string;
}

const saveSymptoms = async (symptomInfo: ISymptom) => {
  let symptomInfoParam = symptomInfo;
  // IF TYPE === OBJECT then ITS FILELIST => needs destructuring else no
  typeof symptomInfo.image === "object"
    ? (symptomInfoParam = {
        ...symptomInfo,
        image: symptomInfo.image?.[0],
      })
    : delete symptomInfoParam.image;
  if (symptomInfo.id) {
    const response = await HttpClient.patch<NepMedsResponse>(
      api.symptom + symptomInfo.id + "/",
      objectToFormData(symptomInfoParam)
    );
    return response;
  } else {
    const response = await HttpClient.post<NepMedsResponse>(
      api.symptom,
      objectToFormData(symptomInfoParam)
    );
    return response;
  }
};

export const useSaveSymptoms = (
  page_no: number,
  page_size: number,
  name: string
) => {
  const queryClient = useQueryClient();

  return useMutation(saveSymptoms, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        `${api.symptom}/?page=${page_no}&page_size=${page_size}&name=${name}`
      );
    },
  });
};

const deleteSymptom = async (symptomInfo: { id: string }) => {
  const response = await HttpClient.delete<NepMedsResponse>(
    api.symptom + symptomInfo.id + "/"
  );
  return response;
};

export const useDeleteSymptom = (
  page_no: number,
  page_size: number,
  name: string
) => {
  const queryClient = useQueryClient();

  return useMutation(deleteSymptom, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        `${api.symptom}/?page=${page_no}&page_size=${page_size}&name=${name}`
      );
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

const getSymptomsDataWithPagination = async (
  page_no: number,
  page_size: number,
  name: string
) => {
  const response = await HttpClient.get<PaginatedResponse<Symptom[]>>(
    `${api.symptom}?page=${page_no}&page_size=${page_size}&name=${name}`
  );
  return response;
};

export const useSymptomsDataWithPagination = ({
  page_no,
  page_size,
  name,
  activeTab,
}: {
  page_no: number;
  page_size: number;
  name: string;
  activeTab: number;
}) => {
  return useQuery(
    `${api.symptom}/?page=${page_no}&page_size=${page_size}&name=${name}`,
    () => getSymptomsDataWithPagination(page_no, page_size, name),
    { select: res => res.data.data, enabled: activeTab === 0 }
  );
};
