import { useMutation } from "react-query";
import { api } from "./service-api";
import { HttpClient } from "./service-axios";
import { toastSuccess } from "./service-toast";
import { toastFail } from "@nepMeds/components/Toast";
import { AxiosError } from "axios";

// TODO: check the similarity
export interface IPatientAppointmentReqBody {
  doctor: number;
  availability: number[];
  full_name: string;
  gender: string;
  symptoms: number[];
  description: string;
  old_report_file?: string;
  status?: string;
}

const createPatientAppointment = ({
  patientAppointmentDetails,
}: {
  patientAppointmentDetails: IPatientAppointmentReqBody;
}) => {
  return HttpClient.post(
    api.patient.appointment.post,
    patientAppointmentDetails
  );
};

export const useCreatePatientAppointment = () => {
  return useMutation(createPatientAppointment, {
    onSuccess: () => toastSuccess("Appointment has been successfuly created!"),
    onError: (error: AxiosError<{ message: string; error: string }>) =>
      toastFail(error.message ?? "Somethig went wrong"),
  });
};
