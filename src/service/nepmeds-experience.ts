import { useMutation, useQueryClient } from "react-query";
import { api } from "./service-api";
import { HttpClient, toFormData } from "./service-axios";
import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import { AxiosResponse } from "axios";

export type ExperienceInfo = IRegisterFields["experience"][number];

const createExperienceData = async (data: ExperienceInfo) => {
  const response = await HttpClient.post(api.experience, toFormData(data));
  return response;
};

export const useExperienceInfoRegister = () =>
  useMutation(createExperienceData);

const updateExperienceData = async (id: number, data: ExperienceInfo[]) => {
  const response = await HttpClient.patch(api.experience + `${id}/`, data);
  return response;
};

export const useUpdateExperienceInfo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse<any, any>,
    unknown,
    { id: number; data: ExperienceInfo[] }
  >(variables => updateExperienceData(variables.id, variables.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(api.experience);
    },
  });

  return mutation;
};
