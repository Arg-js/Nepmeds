import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IDoctorExperience } from "./nepmeds-doctor-profile";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

export type ExperienceInfo = IRegisterFields["experience"][number];

const createExperienceData = async (data: ExperienceInfo) => {
  const response = await HttpClient.post(api.experience, data);
  return response;
};

export const useExperienceInfoRegister = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse<any, any>,
    unknown,
    ExperienceInfo
  >(createExperienceData, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.doctor_profile);
      queryClient.fetchQuery(api.doctor_profile);
    },
  });

  return mutation;
};
const createExperienceFile = async (data: ExperienceInfo) => {
  const formData = new FormData();
  formData.append("doctor_id", data.doctor.toString());

  if (data.experience_documents) {
    // Append multiple files to formData
    data.experience_documents.forEach((file, index) => {
      if (file !== null && file instanceof File)
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
      queryClient.invalidateQueries(api.doctor_profile);
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
        queryClient.invalidateQueries(api.doctor_profile);
        queryClient.fetchQuery(api.doctor_profile);
      },
    }
  );

  return mutation;
};

//Get Single Certificate Info
export const getSingleExperienceInfo = async (id: number) => {
  const response = await HttpClient.get<NepMedsResponse<IDoctorExperience>>(
    api.experience + `${id}/`
  );
  return response.data.data;
};
