import { useQuery } from "react-query";
import { api } from "./service-api";
import { HttpClient } from "./service-axios";

// Get List of appointment for doctors
const getAdminAppointment = async () => {
  const response = await HttpClient.get(`${api.adminAppointment.appointment}`);
  return response;
};

export const useAdminAppointment = () => {
  return useQuery([api.adminAppointment.appointment], getAdminAppointment, {
    select: data => data.data,
  });
};
