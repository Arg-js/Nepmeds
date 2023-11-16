import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "./service-api";
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
const createFaq = (data: ICreateFaq) => {
  return HttpClient.post(api.faq.post, data);
};
export const useCreateFaq = () => {
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
  return HttpClient.get(api.faq.get, {
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

export { useUpdateFaq, useDeleteFaq, useGetFaqList };
