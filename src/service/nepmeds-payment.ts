import { useMutation } from "react-query";
import { api } from "./service-api";
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
