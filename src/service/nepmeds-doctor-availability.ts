import { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NepMedsResponse, PaginatedResponse, api } from "./service-api";
import { HttpClient } from "@nepMeds/service/service-axios";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import serverErrorResponse from "./serverErrorResponse";
import { generatePath } from "react-router-dom";
import { IFilterSearch } from "@nepMeds/types/searchFilter";
import { queryStringGenerator } from "../utils";

export interface IAvailabilityBookingInfo {
  patient_name: string;
  is_appointment: boolean;
}

export interface IChildTimeFrames extends IDate {
  date: string;
  booking_info?: IAvailabilityBookingInfo;
}

export interface IDate extends ITime {
  id: number;
}

export interface ITime {
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
      queryClient.invalidateQueries(api.doctor_availability_details);
      toastSuccess("Availability Deleted successfully!");
    },
    onError: e => {
      toastFail(serverErrorResponse(e));
    },
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
    },
  });
};

const getBookedAvailability = async ({ date }: { date: string }) => {
  const data = await HttpClient.get<NepMedsResponse<IDate[]>>(
    api.booked_availability,
    {
      params: { date },
    }
  );
  return data;
};
export const useGetBookedAvailability = () => {
  return useMutation(getBookedAvailability, {
    onError: e => toastFail(serverErrorResponse(e)),
  });
};

const createFollowUp = (data: IChildTimeFrames) => {
  return HttpClient.patch(
    generatePath(api.followup.patch, { id: `${data.id}` }),
    data
  );
};
export const useCreateFollowUp = () => {
  const queryClient = useQueryClient();
  return useMutation(createFollowUp, {
    onSuccess: () => queryClient.invalidateQueries(api.followup.get),
    onError: e => toastFail(serverErrorResponse(e)),
  });
};

interface IGetDoctorTableAvailability {
  id: number;
  availability_title: string;
  date: string;
  to_date: string;
  from_time: string;
  to_time: string;
  frequency: number;
  booking_count: string;
}

// Get Availability list
const getAvailabilityList = async (qs: string) => {
  const response = await HttpClient.get<
    PaginatedResponse<IGetDoctorTableAvailability>
  >(`${api.doctor_availability_table}?${qs}`);
  return response;
};

export const useGetAvailabilityList = ({
  index,
  page_no,
  page_size,
  search,
}: { index: number } & IFilterSearch) => {
  const qs = queryStringGenerator({ page_no, page_size, search });
  return useQuery(
    [api.doctor_availability_table, qs],
    () => getAvailabilityList(qs),
    {
      select: data => data.data.data,
      enabled: index === 1,
    }
  );
};

export interface IAppointmentDetailTable {
  id: string;
  booking_count: number;
  child_availability: IChildTimeFrames[];
}

// Get Availability details
const getAvailabilityDetails = async (id: string, date: string) => {
  const response = await HttpClient.get<
    NepMedsResponse<IAppointmentDetailTable>
  >(generatePath(api.doctor_availability_details, { id }), {
    params: {
      availability_date: date,
    },
  });
  return response;
};

export const useGetAvailabilityDetails = ({
  id,
  enabled,
  date,
}: {
  id: string;
  enabled: boolean;
  date: string;
}) => {
  return useQuery(
    [api.doctor_availability_details, id, date],
    () => getAvailabilityDetails(id, date),
    {
      enabled: enabled && !!id && !!date,
      select(data) {
        return data.data.data;
      },
    }
  );
};
