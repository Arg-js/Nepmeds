import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
// import { toast } from "react-hot-toast";
import { IFilterSearch } from "@nepMeds/types/searchFilter";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { generatePath } from "react-router-dom";
import { queryStringGenerator } from "../utils";
import { NepMedsResponse, PaginatedResponse, api } from "./service-api";
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

export interface IAdminUserList {
  id: number;
  email: string;
  name: string;
  mobile_number: number;
  created_at: string;
}

// Get Admin User List
const getAdminUser = async (qs: string) => {
  const response = await HttpClient.get<PaginatedResponse<IAdminUserList>>(
    `${api.adminUserRole}?${qs}`
  );
  return response;
};

export const useGetUserRoleAdmin = (filter: IFilterSearch) => {
  const qs = queryStringGenerator({
    page_size: filter.page_size,
    page: filter.page_no,
  });
  return useQuery([api.adminUserRole, qs], () => getAdminUser(qs), {
    select: data => data.data.data,
  });
};

//Delete Admin User
const deleteAdminUser = async (id: string) => {
  const response = await HttpClient.delete(
    generatePath(api.userRole.adminStatus, { id })
  );
  return response;
};

export const useDeleteAdminUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteAdminUser, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.adminUserRole]);
      toastSuccess("Deleted Successfully.");
    },
    onError: e => {
      const error = serverErrorResponse(e);
      toastFail(error);
    },
  });
  return mutation;
};

export interface IAdminSingleDetail {
  id: number;
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  mobile_number: string;
  gender: string;
  date_of_birth: string;
}

//Get single admin user detail
const getSingleAdminUser = async (id: string) => {
  const response = await HttpClient.get<NepMedsResponse<IAdminSingleDetail>>(
    generatePath(api.userRole.adminStatus, { id })
  );
  return response;
};

export const useGetSingleAdminUser = ({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) => {
  return useQuery([api.adminUserRole, id], () => getSingleAdminUser(id), {
    select: data => data.data,
    enabled: !!id && enabled,
  });
};

// Update Admin User
const updateAdminUser = async ({
  id,
  data,
}: {
  id: string;
  data: IAdminSingleDetail;
}) => {
  const response = await HttpClient.patch(
    generatePath(api.userRole.adminStatus, { id }),
    { data }
  );
  return response;
};

export const useUpdateAdminUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(updateAdminUser, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.adminUserRole]);
      toastSuccess("Updated Successfully.");
    },
    onError: e => {
      const error = serverErrorResponse(e);
      toastFail(error);
    },
  });
  return mutation;
};

// Add Admin User
const addAdminUser = async (data: IAdminSingleDetail) => {
  const response = await HttpClient.post(api.adminRegister, data);
  return response;
};

export const useAddAdminUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addAdminUser, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.adminUserRole]);
      toastSuccess("Added Successfully.");
    },
    onError: e => {
      const error = serverErrorResponse(e);
      toastFail(error);
    },
  });
  return mutation;
};
