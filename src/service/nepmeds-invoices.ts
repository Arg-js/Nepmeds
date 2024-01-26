import { IPaginationParams } from "@nepMeds/components/DataTable/Pagination";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";
import serverErrorResponse from "./serverErrorResponse";
import { api, NepMedsResponse, PaginatedResponse } from "./service-api";
import { HttpClient } from "./service-axios";
import { toastFail } from "./service-toast";

export interface IInvoices {
  id: number;
  to_user: string;
  created_at: string;
  transaction_amount: string;
  payment_type: string;
  transaction_message: string;
  discounted_amount: string;
}

export interface InvoicesDetails extends IInvoices {
  from_user: string;
  payment_status: string;
  payment_id: string;
  transaction_id: string;
  order_id: string;
  coupon: string;
}

const getAllInvoices = async ({
  pagination,
}: {
  pagination: IPaginationParams;
}) => {
  const response = await HttpClient.get<PaginatedResponse<IInvoices>>(
    api.patient.invoices.get,
    { params: pagination }
  );
  return response;
};
const useGetAllInvoices = ({
  pagination,
}: {
  pagination: IPaginationParams;
}) => {
  return useQuery(
    [api.patient.invoices.get, pagination],
    () => getAllInvoices({ pagination }),
    {
      select: ({ data }) => data.data,
      onError: e => toastFail(serverErrorResponse(e)),
    }
  );
};

const getInvoices = async ({ id }: { id: string }) => {
  const response = await HttpClient.get<NepMedsResponse<InvoicesDetails>>(
    generatePath(api.patient.invoices.getById, { id })
  );
  return response;
};
const useGetInvoices = ({ id }: { id: string }) => {
  return useQuery(
    [api.patient.invoices.getById, id],
    () => getInvoices({ id }),
    {
      enabled: !!id,
      select: ({ data }) => data.data,
      onError: e => toastFail(serverErrorResponse(e)),
    }
  );
};
export { useGetAllInvoices, useGetInvoices };
