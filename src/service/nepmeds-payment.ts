import { useMutation, useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

export interface IPaymentMethod {
  instant_amount: number;
  schedule_amount: number;
  doctor_amount: {
    payment_mode: number;
    epayment_id?: string;
    bank_account_number?: string;
    bank_account_name?: string;
    bank_branch_name?: string;
    is_primary_method: boolean;
  }[];
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
