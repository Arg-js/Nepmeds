import { useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

const getApprovedDoctorList = async () => {
  const response = await HttpClient.get<NepMedsResponse>(api.approveddoctor);
  return response;
};

export const useApprovedDoctorList = () =>
  useQuery(api.approveddoctor, getApprovedDoctorList, {
    select: data => data.data.data,
  });

const getRejectedDoctorList = async () => {
  const response = await HttpClient.get<NepMedsResponse>(
    api.rejectedDoctorList
  );
  return response;
};
export const useFetchRejectedDoctorList = () =>
  useQuery(api.rejectedDoctorList, getRejectedDoctorList, {
    select: data => data.data.data,
  });

export const useFakePagination = ({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) => {
  return useQuery(
    `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`,
    async () => {
      return await HttpClient.get<any>(
        `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`
      );
    },
    {
      select: data => data.data,
    }
  );
};
