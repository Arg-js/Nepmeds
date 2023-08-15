import { useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

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
  medical_licence_number: string;
  workplace: string;
  district: string;
  municipality: string;
  experience: string;
  schedule_rate: string;
}

export interface IDoctorListById {
  id: number;
  name: string;
  profile_picture: string;
  specialization_names: SpecializationName[];
  medical_licence_number: string;
  bio_detail: string;
  schedule_rate: string;
  availability: IAvailability[];
}

export interface IAvailability {
  id: number;
  date: string;
  from_time: string;
  to_time: string;
}

export interface SpecializationName {
  id: number;
  name: string;
}

export interface IPaginatinParams {
  search: string;
  page_size: number;
  page: number;
  // make different interface
  gender?: string;
  specialization?: string;
}

const getDoctorList = ({
  page_size,
  page,
  search,
  gender,
  specialization,
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
}: IPaginatinParams) => {
  return useQuery(
    [
      api.patient.doctorList.get,
      page_size,
      page,
      search,
      gender,
      specialization,
    ],
    () =>
      getDoctorList({
        search,
        page_size,
        page,
        gender,
        specialization,
      }),
    {
      select: data => data?.data?.data,
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
    api.patient.doctorList.getById.replace("{id}", id.toString()),
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
}: {
  id: number;
  target_date: string;
}) => {
  return useQuery(
    [api.patient.doctorList.getById, id, target_date],
    () => getDoctorListById({ id, target_date }),
    {
      enabled: !!id,
      select: data => data?.data?.data,
    }
  );
};
