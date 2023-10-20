import { useQuery } from "react-query";
import serverErrorResponse from "./serverErrorResponse";
import { api, NepMedsResponse } from "./service-api";
import { HttpClient } from "./service-axios";
import { toastFail } from "./service-toast";

const getHospitalList = () => {
  return HttpClient.get<NepMedsResponse<{ id: number; name: string }[]>>(
    api.hospital_list
  );
};
export const useGetHospitalList = () => {
  return useQuery(api.hospital_list, getHospitalList, {
    select: ({ data }) =>
      data?.data.map(item => ({
        label: item.name,
        value: item.id
      })),
    onError: error => {
      const formattedError = serverErrorResponse(error);
      toastFail(formattedError);
    }
  });
};
