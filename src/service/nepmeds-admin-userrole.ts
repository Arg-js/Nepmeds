import { IFilterSearch } from "@nepMeds/types/searchFilter";
import { useQuery } from "react-query";
import { queryStringGenerator } from "../utils";
import { PaginatedResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

export interface IUserRoleAdmin {
  id: string;
  name: string;
  email: string;
  mobile_number: string;
  specialization_names: {
    id: number;
    name: string;
  }[];
  payment_approved_date: string;
  status: boolean;
}

// Get user according to user role for Doctor
const getUserRoleDoctor = async (qs: string) => {
  const response = await HttpClient.get<PaginatedResponse<IUserRoleAdmin>>(
    `${api.doctorUserRole}?${qs}`
  );
  return response;
};

export const useGetUserRoleDoctor = (filter: IFilterSearch) => {
  const qs = queryStringGenerator({
    page: filter.page_no,
    page_size: filter.page_size,
  });
  return useQuery([api.doctorUserRole, qs], () => getUserRoleDoctor(qs), {
    select: data => data.data.data,
  });
};

// Get user according to user role for patient
const getUserRolePatient = async (qs: string) => {
  const response = await HttpClient.get<PaginatedResponse<IUserRoleAdmin>>(
    `${api.patientUserRole}?${qs}`
  );
  return response;
};

export const useGetUserRolePatient = (filter: IFilterSearch) => {
  const qs = queryStringGenerator({
    page_size: filter.page_size,
    page: filter.page_no,
  });
  return useQuery([api.patientUserRole, qs], () => getUserRolePatient(qs), {
    select: data => data.data.data,
  });
};
