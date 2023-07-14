import { useMutation, useQueryClient } from "react-query";
import { HttpClient } from "./service-axios";
import { api } from "./service-api";

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
        `${api.registereddoctor}/?page=${page_no}&pageSize=${page_size}`
      );
    },
  });
};
