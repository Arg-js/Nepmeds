import { useQuery } from "react-query";
import serverErrorResponse from "./serverErrorResponse";
import { api, NepMedsResponse } from "./service-api";
import { HttpClient } from "./service-axios";
import { toastFail } from "./service-toast";

export interface IDoctorCount {
  doctor_count: number;
  images: string[];
}

const getDoctorCount = () => {
  return HttpClient.get<NepMedsResponse<IDoctorCount>>(
    api.patient.doctor_count.get
  );
};
const useGetDoctorCount = () => {
  return useQuery([api.patient.doctor_count.get], getDoctorCount, {
    onError: e => toastFail(serverErrorResponse(e)),
    select: ({ data }) => data.data,
  });
};

export { useGetDoctorCount };
