import { toastSuccess } from "@nepMeds/components/Toast";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { toastFail } from "@nepMeds/components/Toast";
// import { toast } from "react-hot-toast";
import { generatePath } from "react-router-dom";
import { IFilterSearch } from "@nepMeds/types/searchFilter";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { queryStringGenerator } from "../utils";
import { PaginatedResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";
// import { AxiosResponse } from "axios";

export interface IUserRoleAdmin {
  id: string;
  name: string;
  email: string;
  mobile_number: string;
  nmc_no: number;
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

//Change status for doctor from admin
const updateDoctorStatus = async ({
  id,
  is_active,
}: {
  id: string;
  is_active: boolean;
}) => {
  const response = await HttpClient.patch(
    generatePath(api.userRole.doctorStatus, { id }),
    { is_active }
  );
  return response;
};

export const useUpdateDoctorStatus = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(updateDoctorStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.doctorUserRole]);
      toastSuccess("Status Changed Successfully.");
    },
    onError: e => {
      const error = serverErrorResponse(e);
      toastFail(error);
    },
  });

  return mutation;
};

//Change status for patient from admin
const updatePatientStatus = async ({
  id,
  is_active,
}: {
  id: string;
  is_active: boolean;
}) => {
  const response = await HttpClient.patch(
    generatePath(api.userRole.patientStatus, { id }),
    { is_active }
  );
  return response;
};

export const useUpdatePatientStatus = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(updatePatientStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.patientUserRole]);
      toastSuccess("Status Changed Successfully.");
    },
    onError: e => {
      const error = serverErrorResponse(e);
      toastFail(error);
    },
  });
  return mutation;
};
