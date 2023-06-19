import { useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

interface IUser {
  id?: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  mobile_number: string;
  profile_picture: File | string;
  district: number;
  ward: number;
  tole: number;
  municipality: number;
  province: number;
  gender: string;
  date_of_birth: string;
  email: string;
  password: string;
  confirm_password: string;
  is_mobile_number_verified: boolean;
  is_email_verified: boolean;
}
export interface IDoctorAcademicInfo {
  degree_program: string;
  graduation_year: number;
  university: string;
  major: string;
  file: File;
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
  pan_number: string;
  specialization: string[];
  id_front_image: File;
  id_back_image: File;
  id_number: string;
  id_issued_district: number;
  id_issued_date: string;
  doctor_academic_info: IDoctorAcademicInfo[] | [];
  doctor_certification_info: IDoctorCertificationInfo[] | null;
  doctor_experience: IDoctorExperience[] | null;
  profile_status: string;
  no_of_rejected_times: number;
  rejected_remarks: string;
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
