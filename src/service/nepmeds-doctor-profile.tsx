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
interface IDoctorAcademicInfo {
  degree_program: string;
  graduation_year: number;
  university: string;
  major: string;
  file: string;
}
interface IDoctorCertificationInfo {
  title: string;
  issued_by: string;
  certification_name: string;
  file: string;
  certification_issued_data: string;
}
interface IDoctorExperience {
  hospital: string;
  description: string;
  currently_working: boolean;
  from_date: string;
  to_date: string;
  file: string;
}
interface IGetDoctorProfile {
  user: IUser;
  image: string;
  province: number;
  district: number;
  municipality_vdc: string;
  ward: number;
  tole: string;
  gender: string;
  date_of_birth: string;
  citizenship_number: string;
  citizenship_issued_district: number;
  citizenship_issued_date: string;
  doctor_academic_info: IDoctorAcademicInfo[];
  doctor_certification_info: IDoctorCertificationInfo[];
  doctor_experience: IDoctorExperience[];
}

const getDoctorProfile = async () => {
  const response = await HttpClient.get<NepMedsResponse<IGetDoctorProfile>>(
    api.doctor_profile
  );
  return response;
};
export const useDoctorProfile = () => {
  return useQuery("doctorprofile", getDoctorProfile, {
    select: data => data.data.data,
  });
};
