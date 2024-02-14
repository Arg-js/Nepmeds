import { useMutation, useQuery, useQueryClient } from "react-query";
import { generatePath } from "react-router-dom";
import { api, NepMedsResponse } from "@nepMeds/service/service-api";
import { HttpClient } from "@nepMeds/service/service-axios";
import { toastFail } from "@nepMeds/service/service-toast";
import { IPaginationParams } from "@nepMeds/components/DataTable/Pagination";

export interface IGetAppointmentRequest {
  count: number;
  page_count: number;
  next: string;
  previous: string;
  results: IGetAppointmentReqRes[];
}

export type Gender = "1" | "2" | "3";
export interface IGetAppointmentReqRes {
  id: number;
  full_name: string;
  gender: Gender;
  age: string;
  symptoms: ISymptom[];
  extra_data: {
    cancelled_availability: {
      to_time: string;
      from_time: string;
    };
  };
  created_at: string;
  availability: Availability;
  status: string;
  description: string;
  reject_remarks: string;
  old_report_file: string;
  doctor_user_id: string;
  patient_user_id: string;
  can_add_prescription: boolean;
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

const getAppointmentRequest = async ({
  page,
  page_size,
  status,
}: {
  status?: number | string;
} & IPaginationParams) => {
  const response = await HttpClient.get<
    NepMedsResponse<IGetAppointmentRequest>
  >(api.doctor.appointments.get, {
    params: { page, page_size, status },
  });
  return response;
};

const useGetAppointmentRequest = ({
  page,
  page_size,
  status,
}: {
  status?: number | string;
} & IPaginationParams) => {
  return useQuery(
    [api.doctor.appointments.get, page, page_size, status],
    () => getAppointmentRequest({ page, page_size, status }),
    {
      select: ({ data }) => data?.data,
    }
  );
};

const setAppointmentRequestById = async ({
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
    generatePath(api.doctor.appointments.patch, { id }),
    { status, reject_title, reject_remarks }
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
  return HttpClient.get<NepMedsResponse<IGetAppointmentReqRes>>(
    generatePath(api.doctor.appointments.getById, { id })
  );
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
