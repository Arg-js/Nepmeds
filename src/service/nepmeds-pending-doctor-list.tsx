import { useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

const getPendingDoctorList = async () => {
  const response = await HttpClient.get<NepMedsResponse>(api.pendingdoctor);
  return response;
};

export const usePendingDoctorList = () =>
  useQuery("pendingdoctors", getPendingDoctorList, {
    select: data => data.data.data,
  });
