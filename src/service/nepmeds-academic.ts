import { useMutation, useQueryClient } from "react-query";
import { api } from "./service-api";
import { HttpClient, toFormData } from "./service-axios";
import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";

export type AcademicInfo = IRegisterFields["academic"][number];

const createAcademicData = async (data: AcademicInfo) => {
  const response = await HttpClient.post(api.academic, toFormData(data));
  return response;
};

export const useAcademicInfoRegister = () => useMutation(createAcademicData);

const updateAcademicData = async (data: { id: any; data: AcademicInfo }) => {
  const response = await HttpClient.patch(
    api.academic_update.replace("{id}", data?.id),
    toFormData(data.data)
  );
  return response;
};

export const useUpdateAcademicInfo = () => {
  const queryClient = useQueryClient();
  return useMutation(updateAcademicData, {
    onSuccess() {
      queryClient.invalidateQueries(api.doctor_profile);
    },
  });
};
