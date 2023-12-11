import { useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "@nepMeds/service/service-axios";

const getApprovedDoctorList = async (page_no: number) => {
  const response = await HttpClient.get<NepMedsResponse>(
    `${api.approveddoctor}/?page_no=${page_no}`
  );
  return response;
};

export const useApprovedDoctorList = ({ page_no }: { page_no: number }) =>
  useQuery(
    [api.approveddoctor, page_no],
    () => getApprovedDoctorList(page_no),
    {
      select: data => data.data.data,
    }
  );

const getRejectedDoctorList = async (page_no: number) => {
  const response = await HttpClient.get<NepMedsResponse>(
    `${api.rejectedDoctorList}/?page_no=${page_no}`
  );
  return response;
};
export const useFetchRejectedDoctorList = ({ page_no }: { page_no: number }) =>
  useQuery(
    [api.rejectedDoctorList, page_no],
    () => getRejectedDoctorList(page_no),
    {
      select: data => data.data.data,
    }
  );
