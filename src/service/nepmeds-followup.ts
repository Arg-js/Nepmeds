import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { generatePath } from "react-router-dom";
import { IPaginationParams } from "./nepmeds-faq";
import serverErrorResponse from "./serverErrorResponse";
import { api, NepMedsResponse } from "./service-api";
import { HttpClient } from "./service-axios";

interface IFollowUp {
  availability: Availability;
  patient_name: string;
  symptoms: Symptom[];
  last_appointment_date: string;
}

interface Availability {
  date: string;
  from_time: string;
  to_time: string;
}

interface Symptom {
  name: string;
}

interface IPaginatedParams {
  count: number;
  page_count: number;
  next: string;
  previous: string;
}
interface IFollowUpResBody extends IPaginatedParams {
  results: IFollowUp[];
}

interface IFollowUpReqBody {
  availability: number;
  id: string;
}

const getFollowUp = ({ pageIndex, pageSize, search }: IPaginationParams) => {
  return HttpClient<NepMedsResponse<IFollowUpResBody>>(api.followup.get, {
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      search,
    },
  });
};
const useGetFollowUp = ({
  pageIndex,
  pageSize,
  search,
}: {
  pageIndex: number;
  pageSize: number;
  search: string;
}) => {
  return useQuery(
    [api.followup.get, pageIndex, pageSize, search],
    () => getFollowUp({ pageIndex, pageSize, search }),
    {
      select: ({ data }) => data?.data,
      onError: e => toastFail(serverErrorResponse(e)),
    }
  );
};

const createFollowUp = (data: IFollowUpReqBody) => {
  return HttpClient.patch(generatePath(api.followup.patch, { id: data.id }), {
    ...data,
  });
};
const useCreateFollowUp = () => {
  const queryClient = useQueryClient();
  return useMutation(createFollowUp, {
    onSuccess: () => {
      toastSuccess("Followup successfully updated");
      queryClient.invalidateQueries(api.followup.get);
    },
    onError: e => toastFail(serverErrorResponse(e)),
  });
};
export { useGetFollowUp, useCreateFollowUp };
