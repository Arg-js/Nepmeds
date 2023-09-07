import { IFilterSearch } from "@nepMeds/types/searchFilter";
import { useQuery } from "react-query";
import { queryStringGenerator } from "../utils";
import { PaginatedResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

interface IAppointmentAdmin {
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
  availability_data: {
    date: string;
    from_time: string;
    to_time: string;
  }[];
}

// Get List of appointment for doctors
const getAdminAppointment = async (qs: string) => {
  const response = await HttpClient.get<PaginatedResponse<IAppointmentAdmin>>(
    `${api.adminAppointment.appointment}?${qs}`
  );
  return response;
};

export const useAdminAppointment = (filter: IFilterSearch) => {
  const qs = queryStringGenerator(filter);
  return useQuery(
    [api.adminAppointment.appointment, qs],
    () => getAdminAppointment(qs),
    {
      select: data => data.data.data,
    }
  );
};
