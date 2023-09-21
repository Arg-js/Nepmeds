import { toastFail } from "@nepMeds/components/Toast";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";
import { IAvailability } from "./nepmeds-patient-doctorList";
import { api, NepMedsResponse } from "@nepMeds/service/service-api";
import { HttpClient } from "@nepMeds/service/service-axios";

interface IGetAvailability {
  id: number;
  target_date: string;
}

interface IAvailabilityRes {
  availability: IAvailability[];
}

const getAvailability = async ({ id, target_date }: IGetAvailability) => {
  return HttpClient.get<NepMedsResponse<IAvailabilityRes>>(
    generatePath(api.patient.doctor_availability.get, {
      id: id.toString(),
    }),
    {
      params: { target_date },
    }
  );
};

export const useGetAvailability = ({ id, target_date }: IGetAvailability) => {
  return useQuery(
    [api.patient.doctor_availability.get, id, target_date],
    () => getAvailability({ id, target_date }),
    {
      enabled: !!id && !!target_date,
      select: ({ data }) => data?.data?.availability,
      onError: (error: AxiosError<{ message: string; error: string }>) =>
        toastFail(error.message ?? "Something went wrong"),
    }
  );
};
