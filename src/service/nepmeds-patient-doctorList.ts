import { useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "@nepMeds/service/service-axios";
import { generatePath } from "react-router-dom";
import { toastFail } from "./service-toast";
import serverErrorResponse from "./serverErrorResponse";
import { IPaginationParams } from "@nepMeds/components/DataTable/Pagination";

export interface IDoctorList {
  count: number;
  next: string;
  previous: string;
  results: IDoctorListResult[];
}

export interface IDoctorListResult {
  id: number;
  name: string;
  profile_picture: string;
  title: string;

  specialization_names: SpecializationName[];
  doctor_nmc_info: string;
  workplace: string;
  district: string;
  municipality: string;
  experience: string;
  schedule_rate: string;
  nmc_number?: number;
}

export interface IDoctorListById {
  id: number;
  title: string;
  name: string;
  profile_picture: string;
  specialization_names: SpecializationName[];
  bio_detail: string;
  schedule_rate: string;
  doctor_nmc_info: string;
  doctor_experience: DoctorExperience[];
  availability: IAvailability[];
}

export interface SpecializationName {
  id: number;
  name: string;
}

export interface DoctorExperience {
  id: number;
  hospital: string;
  currently_working: boolean;
  from_date: string;
  to_date: string;
}

export interface IAvailability {
  id: number;
  date: string;
  from_time: string;
  to_time: string;
}

export interface IPaginatinParams extends IPaginationParams {
  gender?: string;
  specialization?: string;
  symptom?: string;
  from_date?: string;
  to_date?: string;
}

const getDoctorList = ({
  page_size,
  page,
  search,
  gender,
  specialization,
  symptom,
  from_date,
  to_date,
}: IPaginatinParams) => {
  return HttpClient.get<NepMedsResponse<IDoctorList>>(
    api.patient.doctorList.get,
    {
      params: {
        search,
        page_size,
        page,
        gender,
        specialization,
        symptom,
        from_date,
        to_date,
      },
    }
  );
};

export const useGetDoctorList = ({
  search,
  page_size,
  page,
  gender,
  specialization,
  symptom,
  from_date,
  to_date,
}: IPaginatinParams) => {
  return useQuery(
    [
      api.patient.doctorList.get,
      page_size,
      page,
      search,
      gender,
      specialization,
      symptom,
      from_date,
      to_date,
    ],
    () =>
      getDoctorList({
        search,
        page_size,
        page,
        gender,
        specialization,
        symptom,
        from_date,
        to_date,
      }),
    {
      select: data => data?.data?.data,
      onError: e => {
        const error = serverErrorResponse(e);
        toastFail(error);
      },
    }
  );
};

const getDoctorListById = ({
  id,
  target_date,
}: {
  id: number;
  target_date: string;
}) => {
  return HttpClient.get<NepMedsResponse<IDoctorListById>>(
    generatePath(api.patient.doctorList.getById, {
      id: id.toString(),
    }),
    {
      params: {
        target_date,
      },
    }
  );
};

export const useGetDoctorListById = ({
  id,
  target_date,
  enabled,
}: {
  id: number;
  target_date: string;
  enabled?: boolean;
}) => {
  return useQuery(
    [api.patient.doctorList.getById, id],
    () => getDoctorListById({ id, target_date }),
    {
      enabled: !!id && enabled,
      select: data => data?.data?.data,
    }
  );
};

const getDoctorListUnpaginated = () => {
  return HttpClient.get<NepMedsResponse<IDoctorListResult[]>>(
    api.patient.doctorList.un_paginated.get
  );
};

export const useGetDoctorListUnpaginated = () => {
  return useQuery(
    api.patient.doctorList.un_paginated.get,
    getDoctorListUnpaginated,
    {
      select: data => data?.data?.data,
      onError: e => {
        const error = serverErrorResponse(e);
        toastFail(error);
      },
    }
  );
};
