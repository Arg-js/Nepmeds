import { useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

interface IGetDoctorProfile {
  user: {
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    mobile_number: string;
    address: string;
  };
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
  doctor_academic_info: [
    {
      degree_program: string;
      graduation_year: number;
      university: string;
      major: string;
      file: string;
    }
  ];
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
