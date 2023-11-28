import { useMutation, useQuery, useQueryClient } from "react-query";
import { api, NepMedsResponse } from "./service-api";
import { HttpClient } from "./service-axios";
import { toastFail, toastSuccess } from "@nepMeds/service/service-toast";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { generatePath } from "react-router-dom";

export interface IPaginationParams {
  pageIndex: number;
  pageSize: number;
  search?: string;
}

export interface ICreateFaq {
  question: string;
  answer: string;
}

export interface IFaqUpdate extends ICreateFaq {
  id: number;
}
export interface IFaqList extends IFaqUpdate {
  id: number;
  created_at: string;
}
interface IFaq {
  count: number;
  page_count: number;
  next: string;
  previous: string;
  results: ICreateFaq[];
}
const createFaq = (data: ICreateFaq) => {
  return HttpClient.post(api.faq.post, data);
};
const useCreateFaq = () => {
  const queryClient = useQueryClient();
  return useMutation(createFaq, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.faq.get]);
      toastSuccess("FAQ added successfully!");
    },
    onError: e => {
      toastFail(serverErrorResponse(e));
    },
  });
};

const getFaqList = ({ pageIndex, pageSize, search }: IPaginationParams) => {
  return HttpClient.get<NepMedsResponse<IFaq>>(api.faq.get, {
    params: { page: pageIndex + 1, page_size: pageSize, search },
  });
};

const useGetFaqList = ({ pageIndex, pageSize, search }: IPaginationParams) => {
  return useQuery(
    [api.faq.get, pageIndex, pageSize, search],
    () => getFaqList({ pageIndex, pageSize, search }),
    {
      select: data => data?.data?.data,
      onError: e => toastFail(serverErrorResponse(e)),
    }
  );
};

const deleteFaq = ({ id }: { id: string }) => {
  return HttpClient.delete(generatePath(api.faq.delete, { id }));
};

const useDeleteFaq = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteFaq, {
    onSuccess: () => {
      toastSuccess("FAQ deleted successfully");
      queryClient.invalidateQueries([api.faq.get]);
    },
  });
};

const updateFaq = (faqUpdateReqBody: IFaqUpdate) => {
  return HttpClient.patch(
    generatePath(api.faq.patch, { id: faqUpdateReqBody.id.toString() }),
    faqUpdateReqBody
  );
};

const useUpdateFaq = () => {
  const queryClient = useQueryClient();
  return useMutation(updateFaq, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.faq.get);
      toastSuccess("FAQ updated successfully!");
    },
    onError: e => {
      toastFail(serverErrorResponse(e));
    },
  });
};

const getAllFaq = ({ pageIndex, pageSize, search }: IPaginationParams) => {
  return HttpClient.get<NepMedsResponse<IFaq>>(api.faqUnpaginated.get, {
    params: { page: pageIndex + 1, page_size: pageSize, search },
  });
};
const useGetALLFaq = ({ pageIndex, pageSize, search }: IPaginationParams) => {
  return useQuery(
    [api.faqUnpaginated.get, pageIndex, pageSize, search],
    () =>
      getAllFaq({
        pageIndex,
        pageSize,
        search,
      }),
    {
      select: ({ data }) => data?.data?.results,
      onError: e => {
        toastFail(serverErrorResponse(e));
      },
    }
  );
};

const getFaqById = ({ id }: { id: string }) => {
  return HttpClient.get<NepMedsResponse<ICreateFaq>>(
    generatePath(api.faq.getById, { id })
  );
};
const useGetFaqById = ({ id }: { id: string }) => {
  return useQuery([api.faq.getById, id], () => getFaqById({ id }), {
    enabled: !!id,
    select: ({ data }) => data?.data,
    onError: e => toastFail(serverErrorResponse(e)),
  });
};

export {
  useDeleteFaq,
  useUpdateFaq,
  useGetFaqList,
  useCreateFaq,
  useGetALLFaq,
  useGetFaqById,
};
