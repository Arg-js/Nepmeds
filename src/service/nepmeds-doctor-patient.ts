import { useQuery } from "react-query";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { api, PaginatedResponse } from "@nepMeds/service/service-api";
import { HttpClient } from "@nepMeds/service/service-axios";
import { toastFail } from "@nepMeds/service/service-toast";

export interface IPatientDetails {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const getPatientDetails = async () => {
  const response = await HttpClient.get<PaginatedResponse<IPatientDetails>>(
    api.admin.patient.get
  );
  return response;
};
const useGetPatientDetails = () => {
  return useQuery(api.admin.patient.get, getPatientDetails, {
    select: ({ data }) => data?.data,
    onError: e => toastFail(serverErrorResponse(e)),
  });
};

export { useGetPatientDetails };
