import { IFilterSearch } from "@nepMeds/types/searchFilter";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { generatePath } from "react-router-dom";
import { useProfileData } from "../context";
import { queryStringGenerator } from "../utils";
import { IUser } from "./nepmeds-doctor-profile";
import { NepMedsResponse, PaginatedResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

export interface IPaymentMethod {
  instant_amount: number;
  schedule_amount: number;
  doctor_amount: {
    payment_mode: number;
    epayment_id?: string;
    account_number?: string;
    account_holder_name?: string;
    branch_name?: string;
    bank_name?: string;
    is_primary_method: boolean;
  }[];
}

export interface IPaymentMethodDoctorAmount {
  id: number;
  payment_mode: number;
  payment_detail: { id: number; name: string; image: null | string };
  epayment_id: string | null;
  account_number: string | null;
  account_holder_name: string | null;
  bank_name: string | null;
  branch_name: string | null;
  is_primary_method: boolean;
}

export interface IGetPaymentMethods {
  id: number;
  instant_amount: string;
  schedule_amount: string;
  doctor_amount: IPaymentMethodDoctorAmount[];
}

// Add payment methods for doctor e.g bank account, esewa and more
const addPaymentMethods = async (paymentMethods: IPaymentMethod) => {
  const response = await HttpClient.post(
    api.payment_methods_create,
    paymentMethods
  );
  return response;
};

export const useCreatePaymentMethods = () => {
  return useMutation(addPaymentMethods, {
    onSuccess: () => {},
  });
};

//Edit Payment methods for doctor
const editPaymentMethods = async ({
  paymentMethods,
  id,
}: {
  paymentMethods: IPaymentMethod;
  id: string;
}) => {
  const response = await HttpClient.patch(
    generatePath(api.edit_payment_methods, { id }),
    paymentMethods
  );
  return response;
};

export const useEditPaymentMethods = () => {
  const profileData = useProfileData();
  const queryClient = useQueryClient();
  return useMutation(editPaymentMethods, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        api.added_payment_methods,
        profileData?.data?.doctor?.id.toString(),
      ]);
    },
  });
};

export interface IPaymentMethodType {
  id: number;
  name: string;
  image: string | null;
}

// Get list of payment methods
const getPaymentMethods = async () => {
  const response = await HttpClient.get<NepMedsResponse<IPaymentMethodType>>(
    api.payment_methods
  );
  return response;
};

export const useGetPaymentMethods = () => {
  return useQuery([api.payment_methods], getPaymentMethods, {
    select: data => data.data.data,
  });
};

//Get list of added payment methods for a doctor
const getAddedPaymentMethods = async (id: string) => {
  const response = await HttpClient.get<NepMedsResponse<IGetPaymentMethods[]>>(
    generatePath(api.added_payment_methods, { doctor_id: id })
  );
  return response;
};

export const useGetAddedPaymentMethods = (id: string) => {
  return useQuery(
    [api.added_payment_methods, id],
    () => getAddedPaymentMethods(id),
    {
      select: data => data.data.data,
      enabled: !!id,
    }
  );
};

//Delete payment methods for a doctor
const deletePaymentMethods = async (id: string) => {
  const response = await HttpClient.delete(
    generatePath(api.delete_payment_methods, { id })
  );
  return response;
};

export const useDeletePaymentMethods = () => {
  const profileData = useProfileData();
  const queryClient = useQueryClient();
  return useMutation(deletePaymentMethods, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        api.added_payment_methods,
        profileData?.data?.doctor?.id.toString(),
      ]);
    },
  });
};

export interface IAllPaymentResponse {
  id: number;
  user: IUser;
  specialization_names: {
    id: number;
    name: string;
  }[];
  status: number;
  rejected_remarks: null | string;
  payment_rejected_remark: string;
  instant_amount: null | string;
  schedule_amount: null | string;
  payment_modes: [];
}

// Get all payment list (Payment Status)
const getPaymentList = async ({
  page_no,
  payment_status,
  from_date,
  to_date,
  page_size,
  name,
  specialization,
}: IFilterSearch) => {
  const qs = queryStringGenerator({
    page: page_no,
    page_size,
    payment_status,
    created_at__date__gte: from_date,
    created_at__date__lte: to_date,
    user__name__icontains: name,
    specialization,
  });
  const response = await HttpClient.get<PaginatedResponse<IAllPaymentResponse>>(
    `${api.allpaymentList}?${qs}`
  );
  return response;
};

export const useGetPaymentList = ({
  page_no,
  payment_status,
  from_date,
  to_date,
  page_size,
  name,
  enabled,
  specialization,
}: IFilterSearch & { enabled?: boolean }) => {
  const qs = queryStringGenerator({
    page: page_no,
    page_size,
    payment_status,
    created_at__date__gte: from_date,
    created_at__date__lte: to_date,
    user__name__icontains: name,
    specialization,
  });
  return useQuery(
    [api.allpaymentList, qs],
    () =>
      getPaymentList({
        page_no: page_no,
        payment_status,
        from_date: from_date,
        to_date: to_date,
        name: name,
        page_size: page_size ?? 10,
        specialization,
      }),
    {
      select: data => data.data.data,
      enabled: !!enabled,
    }
  );
};

//Reject Payment for doctor (Requires Doctor ID)
