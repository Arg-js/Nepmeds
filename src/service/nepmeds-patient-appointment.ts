import { useMutation } from "react-query";
import { api } from "./service-api";
import { HttpClient } from "./service-axios";
import { toastSuccess } from "./service-toast";
import { toastFail } from "@nepMeds/components/Toast";
import { AxiosError } from "axios";
import { objectToFormData } from "@nepMeds/utils/toFormData";
import { IPatientAppointmentBasicDetails } from "@nepMeds/pages/Patient/DoctorList/Section/DoctorDetails";

interface IPatientAppointmentReqBody extends IPatientAppointmentBasicDetails {
  doctor: number;
  symptoms: number[];
  availability: number[];
  old_report_file?: File;
}

const createPatientAppointment = ({
  patientAppointmentDetails,
}: {
  patientAppointmentDetails: IPatientAppointmentReqBody;
}) => {
  return HttpClient.post(
    api.patient.appointment.post,
    objectToFormData(patientAppointmentDetails)
  );
};

export const useCreatePatientAppointment = () => {
  return useMutation(createPatientAppointment, {
    onSuccess: () => toastSuccess("Appointment has been successfuly created!"),
    onError: (error: AxiosError<{ message: string; error: string }>) =>
      toastFail(error.message ?? "Somethig went wrong"),
  });
};
