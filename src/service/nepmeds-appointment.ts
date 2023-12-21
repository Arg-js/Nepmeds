import { IFilterSearch } from "@nepMeds/types/searchFilter";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";
import { queryStringGenerator } from "../utils";
import { NepMedsResponse, PaginatedResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";
import { CallState } from "@nepMeds/config/enum";
import { IPrescriptionInfo } from "./nepmeds-prescription";
import { IExtraData } from "@nepMeds/pages/Patient/PatientDetail";

export interface IAppointmentAdmin extends IExtraData {
  id: number;
  doctor_name: string;
  patient_name: string;
  type: string;
  status: string;
  specialization: {
    id: number;
    name: string;
  }[];
  symptoms_name: {
    name: string;
  }[];
  rate: number;
  date: string;
  from_time: string;
  to_time: string;
  follow_up_status: boolean;
  call_status: CallState;
}

// Get List of appointment for doctors
const getAdminAppointment = async (qs: string) => {
  const response = await HttpClient.get<PaginatedResponse<IAppointmentAdmin>>(
    `${api.adminAppointment.appointment}?${qs}`
  );
  return response;
};

export const useAdminAppointment = (filter: IFilterSearch) => {
  const qs = queryStringGenerator({ ...filter, page: filter.page_no });
  return useQuery(
    [api.adminAppointment.appointment, qs],
    () => getAdminAppointment(qs),
    {
      select: data => data.data.data,
    }
  );
};

export interface IAppointmentDetail {
  id: number;
  full_name: string;
  doctor_detail: {
    title: string;
    doctor_name: string;
    nmc_no: number;
  };
  symptoms_list: string[];
  patient_detail: {
    patient_contact: string;
    patient_email: string;
  };
  doctor_rate: number;
  transaction: {
    paid_amount: number;
    discount_code: string;
    payment_id: string;
    transaction_id: string;
    payment_type: string;
    discount_amount: string;
  };
  number_of_bookings: number;
  call_duration_minutes: number;
  old_report_file?: string;
  prescription_details: IPrescriptionInfo;
  follow_up_details?: {
    follow_up_date: string;
    follow_up_from_time: string;
    follow_up_to_time: string;
  };
}

// Single appointment detail
const getAdminAppointmentDetail = (id: string) => {
  return HttpClient.get<NepMedsResponse<IAppointmentDetail>>(
    generatePath(api.appointmentDetail, { id })
  );
};

export const useAdminAppointmentDetail = (id: string) => {
  return useQuery(
    [api.adminAppointment.appointment, id],
    () => getAdminAppointmentDetail(id),
    {
      enabled: !!id,
      select: data => data.data.data,
    }
  );
};
