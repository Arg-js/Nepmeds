import { useMutation, useQuery, useQueryClient } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

const getPendingDoctorList = async () => {
  const response = await HttpClient.get<NepMedsResponse>(api.pendingdoctor);
  return response;
};

export const usePendingDoctorList = () =>
  useQuery("pendingdoctors", getPendingDoctorList, {
    select: data => data.data.data,
  });
const approveDoc = async (id: string | any) => {
  const response = await HttpClient.post<NepMedsResponse>(
    api.approveddoctor.replace("{id}", id?.id)
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
