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

export interface SpecializationName {
  id: number;
  name: string;
}

const getDoctorList = () => {
  return HttpClient.get<NepMedsResponse<IDoctorList>>(
    api.patient.doctorList.get
  );
};
export const useGetDoctorList = () => {
  return useQuery([api.patient.doctorList.get], getDoctorList, {
    select: data => data.data.data,
  });
};
