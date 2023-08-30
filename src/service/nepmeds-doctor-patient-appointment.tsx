import { useMutation, useQuery, useQueryClient } from "react-query";
import { generatePath } from "react-router-dom";
import { api, NepMedsResponse } from "./service-api";
import { HttpClient } from "./service-axios";
import { toastFail } from "./service-toast";

export interface IGetAppointmentRequest {
  count: number;
  next: string;
  previous: string;
  results: IGetAppointmentReqRes[];
}

export interface IGetAppointmentReqRes {
  id: number;
  patient_name: string;
  symptoms: ISymptom[];
  created_at: string;
  availability: Availability[];
  status: string;
  description: string;
}

export interface ISymptom {
  name: string;
}

export interface Availability {
  id: number;
  date: string;
  from_time: string;
  to_time: string;
}

const getAppointmentRequest = async () => {
  const response = await HttpClient.get<
    NepMedsResponse<IGetAppointmentRequest>
  >(api.doctor.appointments.get);
  return response;
};

const useGetAppointmentRequest = () => {
  return useQuery([api.doctor.appointments.get], getAppointmentRequest, {
    select: ({ data }) => data?.data,
  });
};

const setAppointmentRequestById = async ({
  id,
  status,
  description,
}: {
  id: string;
  status: number;
  description?: string;
}) => {
  const response = await HttpClient.patch(
    generatePath(api.doctor.appointments.patch, { id }),
    { status, description }
  );
  return response;
};

const useSetAppointmentRequestById = () => {
  const queryClient = useQueryClient();
  return useMutation(setAppointmentRequestById, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.doctor.appointments.get);
    },
    onError: () => {
      toastFail("Something went wrong!");
    },
  });
};

const getAppointmentRequestById = ({ id }: { id: string }) => {
  return HttpClient.get<NepMedsResponse<IGetAppointmentReqRes>>(generatePath(api.doctor.appointments.getById, { id }));
};
const useGetAppointmentRequestById = ({ id }: { id: string }) => {
  return useQuery(
    [api.doctor.appointments.getById, id],
    () => getAppointmentRequestById({ id }),
    { enabled: !!id, select: ({ data }) => data?.data }
  );
};
export {
  useGetAppointmentRequest,
  useSetAppointmentRequestById,
  useGetAppointmentRequestById,
};
