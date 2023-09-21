import { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "@nepMeds/service/service-axios";

export interface IChildTimeFrames {
  id: number;
  date: string;
  from_time: string;
  to_time: string;
}

export interface IGetDoctorAvailability {
  id?: 0;
  doctor?: 0;
  title?: string;
  type?: string;
  date?: string;
  from_time?: string;
  to_time?: string;
  frequency?: string;
  child_time_frames?: IChildTimeFrames[];
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
    },
  });

  return mutation;
};

export const getSingleAvailability = async (id: number) => {
  const response = await HttpClient.get<
    NepMedsResponse<IGetDoctorAvailability>
  >(api.doctor_availability + `${id}/`);

  return response.data.data;
};

export const updateDoctorAvailability = async ({
  id,
  data,
}: {
  id: number;
  data: IGetDoctorAvailability;
}) => {
  const response = await HttpClient.patch<NepMedsResponse>(
    api.doctor_availability + id + "/",
    data
  );

  return response;
};

export const useUpdateDoctorAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation(api.doctor_availability, updateDoctorAvailability, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.doctor_availability);
    },
  });
};

const deleteAvailability = async (availabilityId: { id: number }) => {
  const response = await HttpClient.delete<NepMedsResponse>(
    api.doctor_availability + availabilityId.id + "/"
  );
  return response;
};

export const useDeleteAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteAvailability, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.doctor_availability);
    },
  });
};
