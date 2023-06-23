import { useMutation, useQueryClient } from "react-query";
import { api } from "./service-api";
import { HttpClient } from "./service-axios";
import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import { AxiosResponse } from "axios";

export type ExperienceInfo = IRegisterFields["experience"][number];

const createExperienceData = async (data: ExperienceInfo) => {
  const response = await HttpClient.post(api.experience, data);
  return response;
};

export const useExperienceInfoRegister = () =>
  useMutation(createExperienceData);

const createExperienceFile = async (data: ExperienceInfo) => {
  const formData = new FormData();
  formData.append("doctor_id", data.doctor.toString());
  console.log(data);
  if (data.experience_documents) {
    // Append multiple files to formData
    data.experience_documents.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
  }
  const response = await HttpClient.post(api.experience_file, formData);
  return response;
};

export const useExperienceFileRegister = () =>
  useMutation(createExperienceFile);

const updateExperienceData = async (id: number, data: ExperienceInfo) => {
  console.log(id);
  const response = await HttpClient.patch(api.experience + `${id}/`, data);
  return response;
};

export const useUpdateExperienceInfo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse<any, any>,
    unknown,
    { id: number; data: ExperienceInfo }
  >(variables => updateExperienceData(variables.id, variables.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(api.experience);
      queryClient.fetchQuery(api.doctor_profile);
    },
  });

  return mutation;
};

const deleteExperienceData = async (id: number) => {
  const response = await HttpClient.delete(api.experience + `${id}/`);
  return response;
};

export const useDeleteExperienceInfo = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<AxiosResponse<any, any>, unknown, number>(
    id => deleteExperienceData(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(api.experience);
        queryClient.fetchQuery(api.doctor_profile);
      },
    }
  );

  return mutation;
};
