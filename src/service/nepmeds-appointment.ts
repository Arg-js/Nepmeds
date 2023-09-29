import { IFilterSearch } from "@nepMeds/types/searchFilter";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";
import { queryStringGenerator } from "../utils";
import { NepMedsResponse, PaginatedResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

export interface IAppointmentAdmin {
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
  patient_detail: {
    patient_contact: string;
    patient_email: string;
  };
  doctor_rate: number;
}

// Single appointment detail
const getAdminAppointmentDetail = async (id: string) => {
  const response = await HttpClient.get<NepMedsResponse<IAppointmentDetail>>(
    generatePath(api.appointmentDetail, { id })
  );
  return response;
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
