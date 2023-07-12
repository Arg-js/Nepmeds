import { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

export interface IGetDoctorAvailability {
  id?: 0;
  doctor?: 0;
  title?: string;
  type?: string;
  date?: string;
  from_time?: string;
  to_time?: string;
  frequency?: string;
}

const getDoctorAvailability = async () => {
  const response = await HttpClient.get<
    NepMedsResponse<IGetDoctorAvailability[]>
  >(api.doctor_availability);
  return response;
};
export const useDoctorAvailability = () => {
  return useQuery([api.doctor_availability], getDoctorAvailability, {
    select: data => data.data.data,
  });
};

const createDoctorAvailability = async (data: IGetDoctorAvailability) => {
  const response = await HttpClient.post(api.doctor_availability, data);
  return response;
};

export const useCreateDoctorAvailability = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse<any, any>,
    unknown,
    IGetDoctorAvailability
  >(createDoctorAvailability, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.doctor_availability);
      queryClient.fetchQuery(api.doctor_availability);
    },
  });

  return mutation;
};
