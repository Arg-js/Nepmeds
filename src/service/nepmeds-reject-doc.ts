import { useMutation, useQueryClient } from "react-query";
import { api } from "./service-api";
import { HttpClient } from "./service-axios";

const rejectDoc = async (data: { id: string; remarks: string }) => {
  const response = await HttpClient.post(
    api.rejectsingledoctor.replace("{id}", data.id),
    { remarks: data.remarks }
  );
  return response;
};

export const useRejectDoc = (
  page_no?: number,

  page_size?: number
) => {
  const queryClient = useQueryClient();

  return useMutation(rejectDoc, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        `${api.registereddoctor}/?page=${page_no}&page_size=${page_size}`
      );
      queryClient.invalidateQueries(
        `${api.registereddoctor}/?page=${page_no}&page_size=${page_size}&status=pending`
      );
      queryClient.invalidateQueries(
        `${api.registereddoctor}/?page=${page_no}&page_size=${page_size}&status=rejected`
      );
    },
  });
};
