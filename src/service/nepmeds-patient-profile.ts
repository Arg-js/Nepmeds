import { useQuery } from "react-query";
import { IPaginationParams, IParams } from "./nepmeds-discount";
import serverErrorResponse from "./serverErrorResponse";
import { api, NepMedsResponse } from "./service-api";
import { HttpClient } from "./service-axios";
import { toastFail } from "./service-toast";

interface IPatientDetail {
  id: number;
  doctor: number;
  availability: number;
  full_name: string;
  appointment_status: string;
  call_type: string;
  appointment_date: string;
  appointment_starttime: string;
  appointment_endtime: string;
  call_status: string;
  call_duration: string;
  follow_up: string;
}

interface IPatientDetailResp extends IParams {
  results: IPatientDetail[];
}

interface ITransactionDetail {
  fee: number;
  pidx: string;
  status: string;
  refunded: boolean;
  total_amount: number;
  transaction_id: string;
  refid: string;
}
export interface IPatientDetailById {
  id: number;
  doctor: number;
  specialization: {
    name: string;
  }[];
  availability: number;
  full_name: string;
  status: string;
  type: string;
  symptoms: Symptom[];
  doctor_rate: string;
  total_amount_paid: string;
  payment_method: string;
  discount_applied: string;
  paid_amount: number;
  transaction_detail: ITransactionDetail;
  payment_date: string;
  payment_time: string;
  follow_up_date_and_time: string;
}

export interface Symptom {
  name: string;
}

const getPatientDetails = async ({
  page,
  page_size,
  search,
}: IPaginationParams) => {
  const response = await HttpClient.get<NepMedsResponse<IPatientDetailResp>>(
    api.patient.detail.get,
    {
      params: {
        page: page + 1,
        page_size,
        search,
      },
    }
  );
  return response;
};
const useGetPatientDetails = ({
  page,
  page_size,
  search,
}: IPaginationParams) => {
  return useQuery(
    [api.patient.detail.get, page, page_size, search],
    () =>
      getPatientDetails({
        page,
        page_size,
        search,
      }),
    {
      select: ({ data }) => data.data,
      onError(err) {
        toastFail(serverErrorResponse(err));
      },
    }
  );
};

const getPatientById = ({ appointment_id }: { appointment_id: string }) => {
  return HttpClient.get<NepMedsResponse<IPatientDetailById>>(
    api.patient.detail.getById,
    {
      params: { appointment_id },
    }
  );
};
const useGetPatientDetailsById = ({
  appointment_id,
}: {
  appointment_id: string;
}) => {
  return useQuery(
    [api.patient.detail.getById, appointment_id],
    () =>
      getPatientById({
        appointment_id,
      }),
    {
      select: ({ data }) => data.data,
      enabled: !!appointment_id,
      onError: e => toastFail(serverErrorResponse(e)),
    }
  );
};

export { useGetPatientDetails, useGetPatientDetailsById };
