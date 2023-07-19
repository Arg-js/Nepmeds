import queryStringGenerator from "@nepMeds/utils/queryStringGenerator";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Specialization } from "./nepmeds-specialization";
import { NepMedsResponse, PaginatedResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

export interface SpecialistRate {
  id?: number;
  name?: string;
  specialization?: [any];
}
export interface ISpecialistRate {
  id?: number;
  experience?: number;
  is_general_rate?: boolean;
  specialist_name?: string;
  specialization?: Specialization[];

  rate?: number;
  result?: {
    experience?: number;
    id?: number;
    is_general_rate?: boolean;
    specialization?: Specialization[];
  }[];
}
export interface IDoctorList {
  id?: number;
  name?: string;
}

const getSpecialistRate = async () => {
  const response = await HttpClient.get<NepMedsResponse<SpecialistRate>>(
    api.specialistRate.fetchAll
  );
  return response;
};
export const fetchSpecialistRate = () => {
  return useQuery(api.specialistRate.fetchAll, getSpecialistRate, {
    select: res => res.data.data,
  });
};
const getDoctorList = async () => {
  const response = await HttpClient.get<NepMedsResponse<IDoctorList[]>>(
    api.doctorList
  );
  return response;
};

export const fetchDoctorList = () => {
  return useQuery(api.doctorList, getDoctorList, {
    select: res => res.data.data,
  });
};

const getSpecialistRateById = async (id: string) => {
  const response = await HttpClient.get<NepMedsResponse<ISpecialistRate>>(
    api.specialistRate.fetchAll + "/" + id + "/"
  );
  return response;
};
export const useFetchSpecialistRateById = (id: string) => {
  return useQuery(
    api.specialistRate.fetchAll + "/" + id + "/",
    () => getSpecialistRateById(id),
    {
      select: res => res.data.data,
      enabled: id !== "0",
    }
  );
};

const saveSpecialistRate = async (SpecialistRateInfo: {
  doctorprofile: number;

  is_general_rate: boolean;
  rate: string;
}) => {
  const response = await HttpClient.post<NepMedsResponse>(
    api.specialistRate.fetchAll + "/",
    {
      is_general_rate: SpecialistRateInfo.is_general_rate,
      rate: SpecialistRateInfo.rate,
      doctorprofile: SpecialistRateInfo.doctorprofile,
    }
  );
  return response;
};

export const useSaveSpecialistRate = (
  page_no: number,
  page_size: number,
  name?: string
) => {
  const queryClient = useQueryClient();

  const qs = queryStringGenerator({ page_no, page_size, name });

  return useMutation(
    ["post" + api.specialistRate.fetchAll + "/"],
    saveSpecialistRate,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`${api.specialistRate.fetchAll}/?${qs}`);
      },
    }
  );
};
const deleteSpecialistRate = async (SpecialistRateInfo: {
  doctorprofile: string | null;
}) => {
  const response = await HttpClient.delete<NepMedsResponse>(
    api.specialistRate.fetchAll + "/" + SpecialistRateInfo.doctorprofile + "/"
  );
  return response;
};

export const useDeleteSpecialistRate = (
  page_no: number,
  page_size: number,
  name?: string
) => {
  const queryClient = useQueryClient();
  const qs = queryStringGenerator({ page_no, page_size, name });

  return useMutation(deleteSpecialistRate, {
    onSuccess: () => {
      queryClient.invalidateQueries(`${api.specialistRate.fetchAll}/?${qs}`);
    },
  });
};

const getSpecialistRateDataWithPagination = async (qs: string) => {
  const response = await HttpClient.get<PaginatedResponse<ISpecialistRate>>(
    `${api.specialistRate.fetchAll}/?${qs}`
  );
  return response;
};

export const useSpecialistRateDataWithPagination = ({
  page_no,
  page_size,
  activeTab,
  name,
}: {
  page_no: number;
  page_size: number;
  activeTab: number;
  name?: string;
}) => {
  const qs = queryStringGenerator({ page_no, page_size, name });

  return useQuery(
    `${api.specialistRate.fetchAll}/?${qs}`,
    () => getSpecialistRateDataWithPagination(qs),

    { select: response => response.data.data, enabled: activeTab === 2 }
  );
};
const updateSpecialistRate = async (specializationInfo: {
  doctorprofile: number;

  is_general_rate: boolean;
  rate: string;
}) => {
  const response = await HttpClient.patch<NepMedsResponse>(
    api.specialistRate.patch.replace(
      "{id}",
      specializationInfo.doctorprofile?.toString() + "/ "
    ),
    {
      is_general_rate: specializationInfo.is_general_rate,
      rate: specializationInfo.rate,
    }
  );
  return response;
};

export const useUpdateSpecialistRate = (
  page_no: number,
  pageSize: number,
  name: string
) => {
  const queryClient = useQueryClient();
  const qs = queryStringGenerator({ page_no, page_size: pageSize, name });

  return useMutation(
    ["patch" + api.specialistRate.fetchAll + "/"],
    updateSpecialistRate,
    {
      onSuccess: (body: any) => {
        queryClient.invalidateQueries(
          api.specialistRate.fetchAll + "/" + body?.data?.data?.id + "/"
        );
        queryClient.invalidateQueries(`${api.specialistRate.fetchAll}/?${qs}`);
      },
    }
  );
};
