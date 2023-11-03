import { useMutation, useQuery, useQueryClient } from "react-query";
import { NepMedsResponse, PaginatedResponse, api } from "./service-api";
import { HttpClient } from "@nepMeds/service/service-axios";
import { objectToFormData } from "@nepMeds/utils/toFormData";

export interface Specialization {
  id: number;
  symptom_list?: Symptom[];
  name: string;
  consultation_fees?: number;
  image: string;
}

export interface Symptom {
  id: number;
  name: string;
  keyword?: string;
  description: string;
  image: string;
  file?: string;
}

const getSpecializationData = async (
  page_no: number,
  pageSize: number,
  name: string,
) => {
  const response = await HttpClient.get<PaginatedResponse<Specialization[]>>(
    `${api.specialization}?page=${page_no}&page_size=${pageSize}&search=${name}`,
  );
  return response;
};

export const useSpecializationData = ({
  page_no,
  pageSize,
  name,
  activeTab,
}: {
  page_no: number;
  pageSize: number;
  name: string;
  activeTab: number;
}) => {
  return useQuery(
    `${api.specialization}?page=${page_no}&page_size=${pageSize}&name=${name}`,
    () => getSpecializationData(page_no, pageSize, name),
    {
      select: res => res.data.data,
      enabled: activeTab === 1,
    },
  );
};
const getSpecializationRegisterData = async () => {
  const response = await HttpClient.get<NepMedsResponse<Specialization[]>>(
    api.specialization_register,
  );
  return response;
};

export const useSpecializationRegisterData = () =>
  useQuery(api.specialization, getSpecializationRegisterData, {
    select: res => res.data.data,
  });

const saveSpecialization = async (specializationInfo: {
  id?: string | null;
  name: string;
  image?: string;
  symptom: string[];
  consultation_fees: string;
}) => {
  let specializationInfoParam = specializationInfo;
  // IF TYPE === OBJECT then ITS FILELIST => needs destructuring else no
  typeof specializationInfo.image === "object"
    ? (specializationInfoParam = {
        ...specializationInfo,
        image: specializationInfo.image?.[0],
      })
    : delete specializationInfoParam.image;

  if (specializationInfo.id) {
    const response = await HttpClient.post<NepMedsResponse>(
      api.specialization + "/" + specializationInfo.id,
      objectToFormData(specializationInfoParam),
    );
    return response;
  } else {
    const response = await HttpClient.post<NepMedsResponse>(
      api.specialization,
      objectToFormData(specializationInfoParam),
    );
    return response;
  }
};

export const useSaveSpecialization = (
  page_no: number,
  pageSize: number,
  name: string,
) => {
  const queryClient = useQueryClient();

  return useMutation(saveSpecialization, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        `${api.specialization}?page=${page_no}&page_size=${pageSize}&name=${name}`,
      );
    },
  });
};

const deleteSpecialization = async (specializationInfo: {
  id: string | null;
}) => {
  const response = await HttpClient.delete<NepMedsResponse>(
    api.specialization + specializationInfo.id + "/",
  );
  return response;
};

export const useDeleteSpecialization = (
  page_no: number,
  pageSize: number,
  name: string,
) => {
  const queryClient = useQueryClient();

  return useMutation(deleteSpecialization, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        `${api.specialization}?page=${page_no}&page_size=${pageSize}&name=${name}`,
      );
    },
  });
};

const deleteBulkSpecialization = async (specializationInfo: {
  id: number[];
}) => {
  const payload = { id: specializationInfo.id };
  const response = await HttpClient.delete<NepMedsResponse>(
    api.specialization,
    {
      data: payload,
    },
  );
  return response;
};

export const useDeleteBulkSpecialization = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteBulkSpecialization, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.specialization);
    },
  });
};

const updateSpecialization = async (specializationInfo: {
  id?: number | null;
  name: string;
  symptom: string[];
  consultation_fees: number;
  image?: string;
}) => {
  let specializationInfoParam = specializationInfo;
  // IF TYPE === OBJECT then ITS FILELIST => needs destructuring else no
  typeof specializationInfo.image === "object"
    ? (specializationInfoParam = {
        ...specializationInfo,
        image: specializationInfo.image?.[0],
      })
    : delete specializationInfoParam.image;
  const response = await HttpClient.patch<NepMedsResponse>(
    api.specialization + specializationInfo.id + "/",
    objectToFormData(specializationInfoParam),
  );
  return response;
};

export const useUpdateSpecialization = (
  page_no: number,
  pageSize: number,
  name: string,
) => {
  const queryClient = useQueryClient();

  return useMutation(updateSpecialization, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        `${api.specialization}?page=${page_no}&page_size=${pageSize}&name=${name}`,
      );
    },
  });
};
