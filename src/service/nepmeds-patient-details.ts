import { useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

interface IGetPatientBasicProfile {
  id: string;
  email: string;
  name: string;
  mobile_number: string;
  user: string;
}

const getBasicProfile = async () => {
  const response = await HttpClient.get<
    NepMedsResponse<IGetPatientBasicProfile>
  >(api.patient.basicProfile);
  return response;
};

export const usePatientBasicProfile = (enabled: boolean) => {
  return useQuery([api.patient.basicProfile], getBasicProfile, {
    select: data => data.data.data,
    staleTime: Infinity,
    enabled,
  });
};
