import { useMutation } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

export interface IKhaltiPost {
  return_url?: string;
  website_url?: string;
  amount: number;
  purchase_order_id: string;
  purchase_order_name: string;
  customer_info?: {
    name: string;
    email: string;
    phone: string;
  };
  amount_breakdown?: {
    label: string;
    amount: string;
  }[];
  product_details?: {
    identity: number;
    name: string;
    total_price: number;
    quantity: number;
    unit_price: number;
  }[];
}

export interface IEsewaToBackendPost {
  amount: number;
  purchase_order_id: string; // Doctor Id
  appointments: number[];
}

const khaltiPayment = async (
  paymentMethods: IKhaltiPost & { appointments: number[] }
) => {
  const response = await HttpClient.post(
    api.transaction.khalti,
    paymentMethods
  );
  return response;
};

export const useCreateKhaltiPaymentMethods = () => {
  return useMutation(khaltiPayment);
};

export interface IEsewaToBackendRes {
  tAmt: string;
  amt: string;
  txAmt: string;
  psc: string;
  pdc: string;
  scd: string;
  pid: string;
  su: string;
  fu: string;
}

const esewaPayment = async (paymentMethods: IEsewaToBackendPost) => {
  const response = await HttpClient.post<NepMedsResponse<IEsewaToBackendRes>>(
    api.transaction.esewa,
    paymentMethods
  );
  return response;
};

export const useCreateEsewaPaymentMethods = () => {
  return useMutation(esewaPayment);
};
