import { HttpClient } from "@nepMeds/service/service-axios";
import { objectToFormData } from "@nepMeds/utils/toFormData";
import { useMutation } from "react-query";
import { NepMedsResponse, api } from "./service-api";

export interface IPatientAppointmentBasicDetails {
  full_name: string;
  gender: string;
  description: string;
  status?: string;
}

interface IPostPatientAppointmentResponse extends IPatientAppointmentReqBody {
  id: string;
  availability: {
    id: number;
    date: number;
    from_time: string;
    to_time: string;
  };
}

export interface IPatientAppointmentReqBody
  extends IPatientAppointmentBasicDetails {
  doctor: number;
  symptoms: number[];
  availabilities: number[];
  old_report_file?: File;
  total_amount_paid: number;
}

const createPatientAppointment = ({
  patientAppointmentDetails,
}: {
  patientAppointmentDetails: IPatientAppointmentReqBody;
}) => {
  return HttpClient.post<NepMedsResponse<IPostPatientAppointmentResponse[]>>(
    api.patient.appointment.post,
    objectToFormData(patientAppointmentDetails)
  );
};

export const useCreatePatientAppointment = () => {
  return useMutation(createPatientAppointment);
};
