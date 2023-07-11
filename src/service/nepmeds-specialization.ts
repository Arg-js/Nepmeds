import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  IPaginatedRes,
  NepMedsResponse,
  PaginatedResponse,
  api,
} from "./service-api";
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

const getSpecializationData = async (page_no: number) => {
  const response = await HttpClient.get<PaginatedResponse<IPaginatedRes[]>>(
    `${api.specialization_fetch}/?page=${page_no}`
  );
  return response;
};

export const useSpecializationData = ({ page_no }: { page_no: number }) => {
  return useQuery(
    `${api.specialization_fetch}/?page=${page_no}`,
    () => getSpecializationData(page_no),
    {
      select: res => res.data.data,
    }
  );
};
const getSpecializationRegisterData = async () => {
  const response = await HttpClient.get<NepMedsResponse<Specialization[]>>(
    api.specialization_register
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
  symptom: Symptom[];
  consultation_fees: string;
}) => {
  if (specializationInfo.id) {
    const response = await HttpClient.post<NepMedsResponse>(
      api.specialization + "/" + specializationInfo.id,
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
      queryClient.invalidateQueries(`${api.specialization_fetch}/?page=1`);
    },
  });
};

const deleteSpecialization = async (specializationInfo: {
  id: string | null;
}) => {
  const response = await HttpClient.delete<NepMedsResponse>(
    api.specialization + specializationInfo.id + "/"
  );
  return response;
};

export const useDeleteSpecialization = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteSpecialization, {
    onSuccess: () => {
      queryClient.invalidateQueries(`${api.specialization_fetch}/?page=1`);
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
    }
  );
  return response;
};

export const useDeleteBulkSpecialization = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteBulkSpecialization, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.specialization_fetch);
    },
  });
};

const updateSpecialization = async (specializationInfo: {
  id: number;
  data: Specialization;
}) => {
  const response = await HttpClient.post<NepMedsResponse>(
    api.specialization + specializationInfo.id + "/",
    {
      data: specializationInfo.data,
    }
  );
  return response;
};

export const useUpdateSpecialization = () => {
  const queryClient = useQueryClient();

  return useMutation(updateSpecialization, {
    onSuccess: () => {
      queryClient.invalidateQueries(`${api.specialization_fetch}/?page=1`);
    },
  });
};
