import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "./service-api";
import { HttpClient } from "./service-axios";
import { toastFail } from "@nepMeds/service/service-toast";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
export interface ICreateFaq {
  question: string;
  answer: string;
}
export interface IFaqList extends ICreateFaq {
  id: number;
  created_at: string;
}
const createFaq = async (data: ICreateFaq) => {
  return await HttpClient.post(api.faq.create, data);
};

export const useCreateFaq = () => {
  const queryClient = useQueryClient();
  return useMutation(createFaq, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.faq.faqList]);
    }
  });
};

const getFaqList = async () => {
  return await HttpClient.get(api.faq.faqList);
};

export const useGetFaqList = () => {
  return useQuery([api.faq.faqList], getFaqList, {
    select: data => data?.data.data,
    onError: e => toastFail(serverErrorResponse(e))
  });
};

const deleteFaq = async (faqInfo: { id: string }) => {
  return await HttpClient.delete(api.faq.faqDelete + "/" + faqInfo.id);
};

export const useDeleteFaq = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteFaq, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.faq.faqList]);
    }
  });
};
