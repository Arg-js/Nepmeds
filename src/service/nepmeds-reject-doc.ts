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

export const useRejectDoc = () => {
  const queryClient = useQueryClient();

  return useMutation(rejectDoc, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.pendingdoctor);
      queryClient.invalidateQueries(api.registereddoctor);
      queryClient.invalidateQueries(api.approveddoctor);
    },
  });
};
