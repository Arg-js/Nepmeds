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

// Get user according to user role
const getUserRoleAdmin = async (qs: string) => {
  const response = await HttpClient.get<PaginatedResponse<IUserRoleAdmin>>(
    `${api.adminUserRole}?${qs}`
  );
  return response;
};

export const useGetUserRoleAdmin = (filter: IFilterSearch) => {
  const qs = queryStringGenerator({ ...filter, page: filter.page_no });
  return useQuery([api.adminUserRole, qs], () => getUserRoleAdmin(qs), {
    select: data => data.data.data,
  });
};
