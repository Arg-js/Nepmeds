import { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { queryStringGenerator } from "../utils";
import { IGetDoctorProfile } from "./nepmeds-doctor-profile";
import { PaginatedResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

type IGetDoctorList = Pick<
  IGetDoctorProfile,
  "id" | "user" | "specialization_names" | "status" | "rejected_remarks"
>;

export const getDoctorList = async ({
  page_no,
  status,
  from_date,
  to_date,
  specialization,
  page_size,
  name,
}: {
  page_no: number;
  page_size: number;
  status?: string;
  from_date?: string;
  to_date?: string;
  specialization?: string;
  name?: string;
}) => {
  const qs = queryStringGenerator({
    page: page_no,
    page_size,
    status,
    specialization,
    created_at__date__gte: from_date,
    created_at__date__lte: to_date,
    user__name__icontains: name,
  });
  const response = await HttpClient.get<PaginatedResponse<IGetDoctorList>>(
    `${api.registereddoctor}/?${qs}`
  );
  return response;
};

export const useDoctorList = ({
  page_no,
  status,
  from_date,
  to_date,
  specialization,
  page_size,
  name,
  enabled,
}: {
  page_no: number;
  status?: string;
  from_date?: string;
  to_date?: string;
  page_size?: number;
  specialization?: string;
  name?: string;
  enabled?: boolean;
}) => {
  const qs = queryStringGenerator({
    page: page_no,
    page_size,
    status,
    specialization,
    created_at__date__gte: from_date,
    created_at__date__lte: to_date,
    user__name__icontains: name,
  });

  return useQuery(
    `${api.registereddoctor}/?${qs}`,
    () =>
      getDoctorList({
        page_no: page_no,
        status: status,
        from_date: from_date,
        to_date: to_date,
        name: name,
        specialization: specialization,
        page_size: page_size ?? 10,
      }),
    {
      select: data => data.data.data,
      enabled: !!enabled,
    }
  );
};

const deleteDoctorList = async (id: number) => {
  const response = await HttpClient.delete(api.registereddoctor + `${id}/`);
  return response;
};

export const useDeleteDoctorData = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<AxiosResponse<any, any>, unknown, number>(
    id => deleteDoctorList(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(api.registereddoctor);
        queryClient.fetchQuery(api.registereddoctor);
      },
    }
  );

  return mutation;
};
