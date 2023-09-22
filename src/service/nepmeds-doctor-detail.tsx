import { useQuery } from "react-query";
import { HttpClient } from "@nepMeds/service/service-axios";
import { api } from "./service-api";

const doctorDetail = (id: string) => async () => {
  const response = await HttpClient.get(api.doctordetails.replace("{id}", id));
  return response;
};

export const useDoctorDetail = (id: string) =>
  useQuery([api.doctordetails, id], doctorDetail(id), {
    enabled: Boolean(id),
    select: data => data.data.data,
  });
