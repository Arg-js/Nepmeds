import { useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

export interface IUser {
  id?: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  mobile_number: string;
  profile_picture: File | string;

  district_data: { id: number; name: string; province: number };
  ward: number;
  tole: number;
  municipality_data: { id: number; name: string; district: number };
  province_data: { id: number; name: string };
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
  university_data: { id: string; name: string };
  major: string;
  academic_document: File[];
  doctor: number;
  id?: number;
}
export interface IDoctorCertificationInfo {
  title: string;
  issued_by: string;
  certificate_number: string;
  certificate_document: File[];

  certificate_issued_date: string;
  doctor: number;
  id?: number;
}
export interface IDoctorExperience {
  hospital: string;
  description: string;
  currently_working?: boolean;
  from_date: string;
  to_date?: string;
  experience_document: File[];

  doctor: number;
  id?: number;
}

interface IResponseSpecialization {
  id: number;
  name: string;
}
export interface IGetDoctorProfile {
  user: IUser;
  title: string;
  bio_detail: string;
  age: number;
  pan_number: string;
  id?: number;
  specialization_names: IResponseSpecialization[];

  id_front_image: File;
  id_back_image: File;
  id_number: string;
  issued_district: {
    id: number | string;
    name: string;
    province: number | string;
  };
  id_type: string;
  id_issued_date: string | null;
  doctor_academic_info: IDoctorAcademicInfo[] | [];
  doctor_certification_info: IDoctorCertificationInfo[] | [];
  doctor_experience: IDoctorExperience[] | [];
  profile_status: string;
  no_of_rejected_times: number;
  rejected_remarks: string;
  status?: string;
}
export interface IGetDoctorBasicProfile {
  id: number;
  doctor?: {
    id: number;
    rejected_remarks: string;
    specialization: IResponseSpecialization[];
    status: string;
  };
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  mobile_number: string;
  profile_picture: string;

  is_doctor?: boolean;
  is_superuser?: boolean;
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

const getBasicProfile = async () => {
  const response = await HttpClient.get<
    NepMedsResponse<IGetDoctorBasicProfile>
  >(api.basicProfile);
  return response;
};

export const useDoctorBasicProfile = () => {
  return useQuery(api.basicProfile, getBasicProfile, {
    select: data => data.data.data,
  });
};

const getDoctorProfileById = (DoctorId: string) => () => {
  return HttpClient.get<NepMedsResponse<IGetDoctorProfile>>(
    api.doctorProfileById.replace("{id}", DoctorId) + "/"
  );
};

export const fetchDoctorProfileById = (DoctorId: string) => {
  return useQuery(
    [api.doctorProfileById, DoctorId],
    getDoctorProfileById(DoctorId ?? ""),
    {
      enabled: !!DoctorId,
      select: ({ data }) => data,
    }
  );
};
