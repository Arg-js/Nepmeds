import { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "@nepMeds/service/service-axios";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import serverErrorResponse from "./serverErrorResponse";

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
  is_all_related_child?: boolean;
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
    select: data => data.data.data
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
    }
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
  data
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
    }
  });
};

const deleteAvailability = async (deleteAvailabilityParams: {
  id: number;
  is_all_related_child: boolean;
}) => {
  const response = await HttpClient.delete<NepMedsResponse>(
    api.doctor_availability + deleteAvailabilityParams.id + "/",
    { data: deleteAvailabilityParams }
  );
  return response;
};

export const useDeleteAvailability = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAvailability, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.doctor_availability);
    }
  });
};

const setDoctorOnline = ({ is_online }: { is_online: boolean }) => {
  return HttpClient.patch(api.set_doctor_availability, { is_online });
};
export const useSetDoctorOnline = () => {
  return useMutation(setDoctorOnline, {
    onSuccess: response =>
      toastSuccess(
        response?.data?.message ||
          "Your availability status updated successfully."
      ),
    // TODO: Check the requirement if basic-info api has to be recalled after the online status has been update
    onError: e => {
      toastFail(serverErrorResponse(e));
    }
  });
};
