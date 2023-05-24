import { useMutation, useQueryClient } from "react-query";
import { HttpClient } from "./service-axios";
import { NepMedsResponse, api } from "./service-api";

const approveDoc = async (id: string) => {
  const response = await HttpClient.post<NepMedsResponse>(
    api.approvesingledoctor.replace("{id}", id)
  );
  return response;
};

export const useApproveDoc = () => {
  const queryClient = useQueryClient();

  return useMutation(approveDoc, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.pendingdoctor);
      queryClient.invalidateQueries(api.registereddoctor);
      queryClient.invalidateQueries(api.approveddoctor);
    },
  });
};
