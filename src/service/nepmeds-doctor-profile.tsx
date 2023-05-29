import { useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

interface IUser {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  address: string;
}
export interface IDoctorAcademicInfo {
  degree_program: string;
  graduation_year: number;
  university: string;
  major: string;
  file: string;
  doctor: number;
  id?: number;
}
export interface IDoctorCertificationInfo {
  title: string;
  issued_by: string;
  certificate_number: string;
  file: string;
  certificate_issued_date: string;
  doctor: number;
  id?: number;
}
export interface IDoctorExperience {
  hospital: string;
  description: string;
  currently_working: boolean;
  from_date: string;
  to_date: string;
  file: string;
  doctor: number;
  id?: number;
}
export interface IGetDoctorProfile {
  user: IUser;
  title: string;
  bio_detail: string;
  age: number;
  image: string;
  province: string;
  district: string;
  municipality_vdc: string;
  ward: number;
  tole: string;
  gender: string;
  specialization: string[];
  date_of_birth: string;
  citizenship_number: string;
  citizenship_issued_district: number;
  citizenship_issued_date: string;
  doctor_academic_info: IDoctorAcademicInfo[] | [];
  doctor_certification_info: IDoctorCertificationInfo[] | null;
  doctor_experience: IDoctorExperience[] | null;
}

const getDoctorProfile = async () => {
  const response = await HttpClient.get<NepMedsResponse<IGetDoctorProfile>>(
    api.doctor_profile
  );
  return response;
};
export const useDoctorProfile = () => {
  return useQuery([api.doctor_profile], getDoctorProfile, {
    select: data => data.data.data,
  });
};
