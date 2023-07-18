import { useMutation, useQueryClient } from "react-query";
import { HttpClient } from "./service-axios";
import { NepMedsResponse, api } from "./service-api";

const approveDoc = async (id: string) => {
  const response = await HttpClient.post<NepMedsResponse>(
    api.approvesingledoctor.replace("{id}", id)
  );
  return response;
};

export const useApproveDoc = (
  page_no?: number,
  page_size?: number,
  status?: string
) => {
  const queryClient = useQueryClient();

  console.log(
    `${api.registereddoctor}/?page=${page_no}&page_size=${page_size}&status=${status}`
  );

  return useMutation(approveDoc, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        `${api.registereddoctor}/?page=${page_no}&page_size=${page_size}`
      );
      queryClient.invalidateQueries(
        `${api.registereddoctor}/?page=${page_no}&page_size=${page_size}&status=approved`
      );
      queryClient.invalidateQueries(
        `${api.registereddoctor}/?page=${page_no}&page_size=${page_size}&status=pending`
      );
    },
  });
};
