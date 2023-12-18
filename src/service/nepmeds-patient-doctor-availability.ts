import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { generatePath } from "react-router-dom";
import { IAvailability } from "./nepmeds-patient-doctorList";
import {
  api,
  NepMedsResponse,
  PaginatedResponse,
} from "@nepMeds/service/service-api";
import { HttpClient } from "@nepMeds/service/service-axios";
import serverErrorResponse from "./serverErrorResponse";
import { IAvailabilityBookingInfo } from "./nepmeds-doctor-availability";
import { queryStringGenerator } from "../utils";
import { IFilterSearch } from "@nepMeds/types/searchFilter";
import { STATUSTYPE } from "@nepMeds/config/enum";

interface IGetAvailability {
  id: number;
  target_date: string;
}

interface IAvailabilityRes {
  availability: IAvailability[];
}

const getAvailability = async ({ id, target_date }: IGetAvailability) => {
  return HttpClient.get<NepMedsResponse<IAvailabilityRes>>(
    generatePath(api.patient.doctor_availability.get, {
      id: id.toString(),
    }),
    {
      params: { target_date },
    }
  );
};

export const useGetAvailability = ({ id, target_date }: IGetAvailability) => {
  return useQuery(
    [api.patient.doctor_availability.get, id, target_date],
    () => getAvailability({ id, target_date }),
    {
      enabled: !!id && !!target_date,
      select: ({ data }) => data?.data?.availability,
      onError: (error: AxiosError<{ message: string; error: string }>) =>
        toastFail(error.message ?? "Something went wrong"),
    }
  );
};

export interface IRescheduleAppointment {
  doctor_consult: string;
  availability: string;
  remarks: string;
}

// Reschedule Appointment for Patient POST request
const rescheduleAppointment = async (data: IRescheduleAppointment) => {
  const response = await HttpClient.post(api.patient.reschedule.post, data);
  return response;
};

export const useRescheduleAppointment = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(rescheduleAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.patient.detail.get]);
      toastSuccess("Appointment rescheduled successfully!");
    },
    onError: e => {
      toastFail(serverErrorResponse(e));
    },
  });
  return mutation;
};

const getRescheduleAvailability = async ({
  id,
  target_date,
}: IGetAvailability) => {
  return HttpClient.get<NepMedsResponse<IAvailabilityRes>>(
    generatePath(api.patient.reschedule.getAvailability, {
      id: id.toString(),
    }),
    {
      params: { target_date },
    }
  );
};

export const useGetRescheduleAvailability = ({
  id,
  target_date,
}: IGetAvailability) => {
  return useQuery(
    [api.patient.doctor_availability.get, id, target_date],
    () => getRescheduleAvailability({ id, target_date }),
    {
      enabled: !!id && !!target_date,
      select: ({ data }) => data?.data?.availability,
    }
  );
};

export type AvailabilityBooking = IAvailability &
  Partial<IAvailabilityBookingInfo>;

export interface IGetRescheduledList {
  id: string;
  patient: string;
  old_availability: AvailabilityBooking;
  request_availability: AvailabilityBooking;
  extra_data?: {
    doctor_remarks?: string;
    cancelled_availability?: AvailabilityBooking;
  };

  remarks: string;
}

const getRescheduleList = async (qs: string) => {
  return HttpClient.get<PaginatedResponse<IGetRescheduledList>>(
    api.doctor.reschedule.get + `?${qs}`
  );
};

export const useGetRescheduledList = ({
  page_no,
  page_size,
  search,
  enabled = true,
  is_history,
}: IFilterSearch & { enabled?: boolean; is_history?: boolean }) => {
  const qs = queryStringGenerator({
    page: page_no,
    page_size,
    search,
    is_history,
  });
  return useQuery(
    [api.patient.doctor_availability.get, qs],
    () => getRescheduleList(qs),
    {
      select: ({ data }) => data?.data,
      enabled,
    }
  );
};

// Approve Rescheduled Appointment
const approveRescheduledAppointment = async ({
  status,
  id,
}: {
  status: STATUSTYPE;
  id: string;
}) => {
  return HttpClient.patch(generatePath(api.doctor.reschedule.patch, { id }), {
    status,
  });
};

export const useApproveReschedule = () => {
  const queryClient = useQueryClient();

  return useMutation(approveRescheduledAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.patient.doctor_availability.get]);
    },
    onError: () => {
      toastFail("Something went wrong!");
    },
  });
};

// Reject Rescheduled Appointment
const rejectRescheduled = async ({
  id,
  status,
  reject_title,
  reject_remarks,
}: {
  id: string;
  status: number;
  reject_title?: number;
  reject_remarks?: string;
}) => {
  const response = await HttpClient.patch(
    generatePath(api.doctor.reschedule.patch, { id }),
    { status, reject_title, reject_remarks }
  );
  return response;
};

export const useRejectRescheduled = () => {
  const queryClient = useQueryClient();
  return useMutation(rejectRescheduled, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.patient.doctor_availability.get]);
    },
    onError: () => {
      toastFail("Something went wrong!");
    },
  });
};

export type IAdminRescheduledAppointment = Omit<
  IGetRescheduledList,
  "request_availability" | "remarks"
> & {
  status: STATUSTYPE;
  doctor: string;
};

// Reschedule Appointment for Admin
const adminRescheduledAppointment = async (qs: string) => {
  const response = await HttpClient.get<
    PaginatedResponse<IAdminRescheduledAppointment>
  >(api.admin.reschedule.get + `?${qs}`);
  return response;
};

export const useGetRescheduledAdmin = ({
  page_no,
  page_size,
  search,
}: IFilterSearch) => {
  const qs = queryStringGenerator({
    page: page_no,
    page_size,
    search,
  });
  return useQuery(
    [api.admin.reschedule.get, page_no, page_size, search],
    () => adminRescheduledAppointment(qs),
    {
      select: data => data.data.data,
    }
  );
};

export type IGetRescheduledById = IGetRescheduledList & {
  status: STATUSTYPE;
  doctor: string;
};

// Get Rescheduled Appointment detail by ID
const getRescheduledById = async (id: string) => {
  const response = await HttpClient.get<NepMedsResponse<IGetRescheduledById>>(
    generatePath(api.admin.reschedule.detail, { id })
  );
  return response;
};

export const useGetRescheduledById = (id: string) => {
  return useQuery(
    [api.admin.reschedule.get, id],
    () => getRescheduledById(id),
    {
      enabled: !!id,
      select: data => data.data.data,
    }
  );
};
