import { useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "@nepMeds/service/service-axios";

const getPendingDoctorList = async (page_no: number) => {
  const response = await HttpClient.get<NepMedsResponse>(
    `${api.pendingdoctor}/?page_no=${page_no}`
  );
  return response;
};

export const usePendingDoctorList = ({ page_no }: { page_no: number }) =>
  useQuery(
    `${api.pendingdoctor}/?page_no=${page_no}`,
    () => getPendingDoctorList(page_no),
    {
      select: data => data.data.data,
    }
  );
