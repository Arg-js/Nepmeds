import { useMutation, useQueryClient } from "react-query";
import { api } from "./service-api";
import { HttpClient, toFormData } from "./service-axios";
import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import { AxiosResponse } from "axios";

export type AcademicInfo = IRegisterFields["academic"][number];

const createAcademicData = async (data: AcademicInfo) => {
  const response = await HttpClient.post(api.academic, toFormData(data));
  return response;
};

export const useAcademicInfoRegister = () => useMutation(createAcademicData);

const updateAcademicData = async (id: number, data: AcademicInfo[]) => {
  const response = await HttpClient.patch(api.academic + `${id}/`, data);
  return response;
};

export const useUpdateAcademicInfo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse<any, any>,
    unknown,
    { id: number; data: AcademicInfo[] }
  >(variables => updateAcademicData(variables.id, variables.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(api.academic);
    },
  });

  return mutation;
};
