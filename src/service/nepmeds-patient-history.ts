import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";
import serverErrorResponse from "./serverErrorResponse";
import { api, PaginatedResponse } from "./service-api";
import { HttpClient } from "./service-axios";
import { toastFail } from "./service-toast";

export interface IPatientHistory {
  id: number;
  patient_name: string;
  gender: string;
  appointment_date: string;
}

export type IPatientHistoryById = Partial<IAppointments>;

export interface IAppointments {
  id: number;
  symptoms: { name: string }[];
  availability: Availability;
  old_report_file: string;
  is_prescription_available: boolean;
}

export interface Availability {
  id: number;
  date: string;
  from_time: string;
  to_time: string;
}

const getPatientHistory = async () => {
  const response = await HttpClient.get<PaginatedResponse<IPatientHistory>>(
    api.patient_history.get
  );
  return response;
};
const useGetPatientHistory = () => {
  return useQuery(api.patient_history.get, getPatientHistory, {
    select: ({ data }) => data,
    onError: e => serverErrorResponse(e),
  });
};

const getPatientHistoryById = async ({
  id,
  is_followup_detail,
}: {
  id: string;
  is_followup_detail: boolean;
}) =>
  await HttpClient.get<PaginatedResponse<IPatientHistoryById>>(
    generatePath(api.patient_history.getById, { id }),
    {
      params: {
        is_followup_detail,
      },
    }
  );

const useGetPatientHistoryById = ({
  id,
  is_followup,
}: {
  id: string;
  is_followup: boolean;
}) =>
  useQuery(
    [api.patient_history.getById, id, is_followup],
    () =>
      getPatientHistoryById({
        id,
        is_followup_detail: is_followup ? true : false,
      }),
    {
      select: ({ data }) => data.data,
      enabled: !!id,
      onError: e => toastFail(serverErrorResponse(e)),
    }
  );

export { useGetPatientHistory, useGetPatientHistoryById };
