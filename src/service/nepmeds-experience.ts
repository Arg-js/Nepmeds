import { useMutation, useQueryClient } from "react-query";
import { api } from "./service-api";
import { HttpClient, toFormData } from "./service-axios";
import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";

export type ExperienceInfo = IRegisterFields["experience"][number];

const createExperienceData = async (data: ExperienceInfo) => {
  const response = await HttpClient.post(api.experience, toFormData(data));
  return response;
};

export const useExperienceInfoRegister = () =>
  useMutation(createExperienceData);

const updateExperienceData = async (data: {
  id: any;
  data: ExperienceInfo;
}) => {
  const response = await HttpClient.patch(
    api.experience_update.replace("{id}", data?.id),
    toFormData(data.data)
  );
  return response;
};

export const useUpdateExperienceInfo = () => {
  const queryClient = useQueryClient();
  return useMutation(updateExperienceData, {
    onSuccess() {
      queryClient.invalidateQueries(api.doctor_profile);
    },
  });
};
