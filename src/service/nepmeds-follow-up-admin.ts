import { useQuery } from "react-query";
import { IParams } from "./nepmeds-discount";
import serverErrorResponse from "./serverErrorResponse";
import { api, NepMedsResponse } from "./service-api";
import { HttpClient } from "./service-axios";
import { toastFail } from "./service-toast";

interface IPaginationParams {
  page: number;
  page_size: number;
  search?: string;
}

export interface IFollowUp {
  id: number;
  followup_availability: FollowupAvailability;
  doctor_name: string;
  patient_name: string;
  symptoms: Symptom[];
  last_appointment_date: string;
  is_callable: string;
  caller_id: string;
  receiver_id: string;
}

export interface FollowupAvailability {
  date: string;
  from_time: string;
  to_time: string;
}

interface IFollowupAvailability extends IParams {
  results: FollowupAvailability[];
}

export interface Symptom {
  name: string;
}

const getFollowUp = (params: IPaginationParams) => {
  return HttpClient.get<NepMedsResponse<IFollowupAvailability>>(
    api.admin.follow_up.get,
    {
      params,
    }
  );
};
const useGetFollowUp = (params: IPaginationParams) => {
  return useQuery([api.admin.follow_up.get], () => getFollowUp(params), {
    select: ({ data }) => data.data,
    onError: e => toastFail(serverErrorResponse(e)),
  });
};

export { useGetFollowUp };
