import { useMutation, useQuery, useQueryClient } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";
import { AxiosResponse } from "axios";

const getDoctorList = async () => {
  const response = await HttpClient.get<NepMedsResponse>(api.registereddoctor);
  return response;
};

export const useDoctorList = () =>
  useQuery(api.registereddoctor, getDoctorList, {
    select: data => data.data.data,
  });

const deleteDoctorList = async (id: number) => {
  console.log(id);
  const response = await HttpClient.delete(api.registereddoctor + `${id}/`);
  return response;
};

export const useDeleteDoctorData = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<AxiosResponse<any, any>, unknown, number>(
    id => deleteDoctorList(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(api.registereddoctor);
        queryClient.fetchQuery(api.registereddoctor);
      },
    }
  );

  return mutation;
};
