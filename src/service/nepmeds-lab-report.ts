import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { generatePath } from "react-router-dom";
import serverErrorResponse from "./serverErrorResponse";
import { api, NepMedsResponse } from "./service-api";
import { HttpClient, toFormData } from "./service-axios";

export interface ILabReport {
  appointment_id: number;
  image: FileList;
}
export interface LabReport {
  id: string;
  image: string;
}

const createLabReport = (data: ILabReport) => {
  return HttpClient.post(api.patient.lab_report.post, toFormData(data));
};
const useCreateLabReport = () => {
  const queryClient = useQueryClient();
  return useMutation(createLabReport, {
    onSuccess: () => {
      toastSuccess("Created Lab Report Successfully");
      queryClient.invalidateQueries(api.patient.lab_report.get);
    },
    onError: error => toastFail(serverErrorResponse(error)),
  });
};

const getLabReport = (id: string) => {
  return HttpClient.get<NepMedsResponse<LabReport[]>>(
    generatePath(api.patient.lab_report.get, {
      id,
    })
  );
};
const useGetLabReport = (id: string) => {
  return useQuery([api.patient.lab_report.get, id], () => getLabReport(id), {
    onError: error => toastFail(serverErrorResponse(error)),
    enabled: !!id,
    select: ({ data }) => data?.data,
  });
};

const deleteLabReport = (id: string) => {
  return HttpClient.delete(generatePath(api.patient.lab_report.delete, { id }));
};
const useDeleteLabReport = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteLabReport, {
    onSuccess: () => queryClient.invalidateQueries(api.patient.lab_report.get),
    onError: e => toastFail(serverErrorResponse(e)),
  });
};

export { useCreateLabReport, useGetLabReport, useDeleteLabReport };
