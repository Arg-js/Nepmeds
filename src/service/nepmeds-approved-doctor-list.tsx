import { useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

const getApprovedDoctorList = async () => {
  const response = await HttpClient.get<NepMedsResponse>(api.approveddoctor);
  return response;
};

export const useApprovedDoctorList = () =>
  useQuery(api.approveddoctor, getApprovedDoctorList, {
    select: data => data.data.data,
  });
