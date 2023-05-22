import { useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

const getDoctorList = async () => {
  const response = await HttpClient.get<NepMedsResponse>(api.registereddoctor);
  return response;
};

export const useDoctorList = () =>
  useQuery("doctorlist", getDoctorList, {
    select: data => data.data.data,
  });
