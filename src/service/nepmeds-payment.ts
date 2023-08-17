import { useMutation, useQuery, useQueryClient } from "react-query";
import { generatePath } from "react-router-dom";
import { useProfileData } from "../context";
import { NepMedsResponse, api } from "./service-api";
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
  const queryClient = useQueryClient();
  return useMutation(addPaymentMethods, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.added_payment_methods]);
    },
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
